#!/usr/bin/env python3
"""Increment the footer patch version once per commit, based on HEAD."""
import re
import subprocess
from pathlib import Path


def git(*args):
    return subprocess.check_output(['git', *args], text=True)


pattern = re.compile(r'(<footer\b[^>]*>[\s\S]*?<p>)v(\d+)\.(\d+)\.(\d+)(</p>)')
staged = git('show', ':index.html')
previous = git('show', 'HEAD:index.html')
match = pattern.search(previous)
if not match or not pattern.search(staged):
    raise SystemExit('Footer version missing; commit cancelled.')
version = f'{match[2]}.{match[3]}.{int(match[4]) + 1}'
updated = pattern.sub(lambda m: f'{m[1]}v{version}{m[5]}', staged, count=1)
if staged != updated:
    # Preserve partial staging: stop rather than stage unrelated HTML changes.
    if git('diff', '--', 'index.html'):
        raise SystemExit('Stage or stash index.html changes before committing so the version can be updated safely.')
    Path('index.html').write_text(updated)
    subprocess.run(['git', 'add', '--', 'index.html'], check=True)
print(f'Footer version: v{version}')
