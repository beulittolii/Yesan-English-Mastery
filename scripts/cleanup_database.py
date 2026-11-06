#!/usr/bin/env python3
"""Audit known Firestore records; --apply backs up and removes confirmed orphans."""
import argparse
import datetime
import json
import pathlib
import urllib.error
import urllib.parse
import urllib.request

BASE = 'https://firestore.googleapis.com/v1/projects/english-mastery-d4427/databases/(default)/documents'
COLLECTIONS = ('students', 'tests', 'vocabSets', 'vocabTestResults', 'textMemorizeResults', 'academicData')


def request(url, data=None):
    req = urllib.request.Request(url, data=None if data is None else json.dumps(data).encode(), headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def scan(collection):
    docs, token = [], None
    while True:
        query = {'pageSize': 1000}
        if token:
            query['pageToken'] = token
        result = request(BASE + '/' + collection + '?' + urllib.parse.urlencode(query))
        docs.extend(result.get('documents', []))
        token = result.get('nextPageToken')
        if not token:
            return docs


def decode(value):
    if 'mapValue' in value:
        return {k: decode(v) for k, v in value['mapValue'].get('fields', {}).items()}
    if 'arrayValue' in value:
        return [decode(v) for v in value['arrayValue'].get('values', [])]
    return next(iter(value.values()), None)


def plan(snapshot):
    students = {str(decode(d['fields']['id'])) for d in snapshot['students']}
    if not students:
        raise RuntimeError('학생 목록이 비어 있어 정리를 중단합니다.')
    tests = {d['name'].rsplit('/', 1)[1] for d in snapshot['tests'] if str(decode(d['fields'].get('studentId', {}))) in students}
    writes = []
    for collection, docs in snapshot.items():
        for doc in docs:
            fields = doc.get('fields', {})
            item = {k: decode(v) for k, v in fields.items()}
            remove = False
            changed = []
            if collection in ('tests', 'vocabTestResults', 'textMemorizeResults'):
                remove = ('studentId' in item and str(item['studentId']) not in students)
                if collection != 'tests' and item.get('testId'):
                    remove |= str(item['testId']) not in tests
            elif collection == 'vocabSets' and isinstance(item.get('studentIds'), list):
                original = fields['studentIds'].get('arrayValue', {}).get('values', [])
                filtered = [v for v in original if str(decode(v)) in students]
                if filtered != original:
                    fields = {**fields, 'studentIds': {'arrayValue': {'values': filtered}}}
                    changed = ['studentIds']
            elif collection == 'academicData' and 'items' in fields:
                raw = fields['items']
                if 'arrayValue' in raw:
                    original = raw['arrayValue'].get('values', [])
                    filtered = [v for v in original if not isinstance(decode(v), dict) or 'studentId' not in decode(v) or str(decode(v)['studentId']) in students]
                    new = {'arrayValue': {'values': filtered}}
                elif 'mapValue' in raw:
                    original = raw['mapValue'].get('fields', {})
                    # Target universities are keyed by student ID; science records carry studentId.
                    keyed = doc['name'].endswith('/academicTargetUnivs')
                    filtered = {k: v for k, v in original.items() if (not keyed or k in students) and (not isinstance(decode(v), dict) or 'studentId' not in decode(v) or str(decode(v)['studentId']) in students)}
                    new = {'mapValue': {'fields': filtered}}
                else:
                    continue
                if filtered != original:
                    fields = {**fields, 'items': new}
                    changed = ['items']
                    if 'count' in fields:
                        fields['count'] = {'integerValue': str(len(filtered))}
                        changed.append('count')
            precondition = {'updateTime': doc['updateTime']}
            if remove:
                writes.append({'delete': doc['name'], 'currentDocument': precondition})
            elif changed:
                writes.append({'update': {'name': doc['name'], 'fields': fields}, 'updateMask': {'fieldPaths': changed}, 'currentDocument': precondition})
    return writes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--backup-dir', default='/private/tmp/english-mastery-cleanup')
    args = parser.parse_args()
    snapshot = {c: scan(c) for c in COLLECTIONS}
    writes = plan(snapshot)
    print(json.dumps({'documents': {c: len(d) for c, d in snapshot.items()}, 'deletes': sum('delete' in w for w in writes), 'updates': sum('update' in w for w in writes)}, ensure_ascii=False))
    if not args.apply or not writes:
        return
    folder = pathlib.Path(args.backup_dir)
    folder.mkdir(parents=True, exist_ok=True, mode=0o700)
    backup = folder / (datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '.json')
    with open(backup, 'x', opener=lambda path, flags: __import__('os').open(path, flags, 0o600)) as stream:
        json.dump({'snapshot': snapshot, 'writes': writes}, stream, ensure_ascii=False)
    print('Backup:', backup)
    # All writes in a single atomic commit. Refuse a larger plan rather than partially applying it.
    if len(writes) > 450:
        raise RuntimeError('정리 대상이 450건을 초과하여 자동 적용하지 않습니다.')
    request(BASE + ':commit', {'writes': writes})
    print('Applied:', len(writes))
    remaining = plan({c: scan(c) for c in COLLECTIONS})
    print('Remaining changes:', len(remaining))


if __name__ == '__main__':
    main()
