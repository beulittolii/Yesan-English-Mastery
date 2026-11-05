/** 문법 시험 전용 트랜잭션. 저장 성공 전에는 화면의 시험/단계를 변경하지 않는다. */
Object.assign(AppData, {
  cacheGrammarTests(records) {
    const recordsById = new Map(records.map(t => [t.id, t]));
    FirebaseStore.tests = [...this.getTests().filter(t => !recordsById.has(t.id)), ...records];
    setLocalCache(LOCAL_CACHE_KEYS.tests, FirebaseStore.tests);
    this.refreshCloudScreens();
  },

  async updateGrammarTest(id, update) {
    if (!this.isFirebaseReady()) throw new Error('클라우드 연결 후 다시 저장해주세요.');
    const { doc, runTransaction } = window.firebaseFns;
    const ref = doc(window.firebaseDB, 'tests', id);
    const saved = await runTransaction(window.firebaseDB, async transaction => {
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) throw new Error('시험을 찾을 수 없습니다.');
      const test = GrammarLogic.clone(snapshot.data());
      if (test.type !== 'GRAMMAR') throw new Error('문법 시험이 아닙니다.');
      update(test);
      test.grammarUpdatedAt = new Date().toISOString();
      transaction.set(ref, test);
      return test;
    });
    this.cacheGrammarTests([saved]);
    return saved;
  },

  async assignGrammarTest({ studentId, date, time, endTime, parts, note }) {
    if (!this.isFirebaseReady()) throw new Error('클라우드 연결 후 다시 배정해주세요.');
    if (!App.state.isAdminLoggedIn) throw new Error('선생님만 배정할 수 있습니다.');
    if (!shouldKeepTest({ date })) throw new Error('등록 가능한 날짜를 선택해주세요.');
    if (!parts.length || parts.some(p => !GrammarLogic.parts.includes(p))) throw new Error('배정할 영역을 선택해주세요.');
    const { doc, runTransaction } = window.firebaseFns;
    const rootId = `grammar_${GRAMMAR_UNIT.id}_student_${Number(studentId)}`;
    const rootRef = doc(window.firebaseDB, 'tests', rootId);
    const nextId = `grammar_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const records = await runTransaction(window.firebaseDB, async transaction => {
      const rootSnapshot = await transaction.get(rootRef);
      const root = rootSnapshot.exists() ? rootSnapshot.data() : null;
      if (!root && (parts.length !== 2 || !GrammarLogic.parts.every(p => parts.includes(p)))) throw new Error('최초 시험은 개념과 실전을 함께 배정해야 합니다.');
      if (root) {
        // 최신 영역별 시험 문서를 직접 읽어 오래된 화면에서도 중복 재시험을 막는다.
        for (const part of parts) {
          const latestId = root.grammarLatest?.[part] || rootId;
          const latest = latestId === rootId ? root : (await transaction.get(doc(window.firebaseDB, 'tests', latestId))).data();
          if (!latest || GrammarLogic.partState(latest, part) !== 'FAIL') throw new Error(`${GrammarLogic.label(part)}은 미달이 확정된 경우에만 재배정할 수 있습니다.`);
        }
      }
      const id = root ? nextId : rootId;
      const sequence = root ? (root.grammarLastSequence || 0) + 1 : 0;
      const test = {
        id, studentId: Number(studentId), type: 'GRAMMAR', title: `가정법 문법 테스트${root ? ' · 재시험' : ''}`,
        date, time, endTime, scope: parts.map(p => GrammarLogic.label(p)).join(' + '), cutoff: '개념·실전 문제 각각 80점 이상', cutoffScore: 80,
        status: 'SCHEDULED', score: '', retestStatus: 'NONE', retestDate: '', teacherNote: note || '',
        grammarUnitId: GRAMMAR_UNIT.id, grammarVersion: root?.grammarVersion || GRAMMAR_UNIT.version,
        grammarContent: GrammarLogic.clone(root?.grammarContent || GRAMMAR_UNIT),
        grammarRootId: rootId, grammarSequence: sequence, grammarParts: [...parts],
        grammarStage: parts.includes('concept') ? 'concept' : 'practice', grammarResults: {},
        grammarCreatedAt: new Date().toISOString()
      };
      const latest = { ...(root?.grammarLatest || {}) };
      parts.forEach(part => { latest[part] = id; });
      if (root) {
        const updatedRoot = { ...root, grammarLatest: latest, grammarLastSequence: sequence };
        transaction.set(rootRef, updatedRoot);
        transaction.set(doc(window.firebaseDB, 'tests', id), test);
        return [updatedRoot, test];
      }
      test.grammarLatest = latest;
      test.grammarLastSequence = sequence;
      transaction.set(rootRef, test);
      return [test];
    });
    this.cacheGrammarTests(records);
    return records.at(-1);
  }
});
