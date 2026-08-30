#!/usr/bin/env python3
"""
GitHub 실시간 자동 동기화 프로그램 (File Change Watcher)
파일이 추가, 수정, 삭제되면 즉시 감지하여 GitHub로 자동 커밋 & 푸시합니다.
"""

import subprocess
import time
import os
import sys
from datetime import datetime

TARGET_DIR = os.path.dirname(os.path.abspath(__file__))
CHECK_INTERVAL = 1.0     # 파일 변경 감지 주기 (1초마다 실시간 체크)
DEBOUNCE_DELAY = 3.0     # 변경 후 저장 완료까지 대기 시간 (3초)

IGNORE_PATTERNS = {
    ".git",
    ".DS_Store",
    "auto_sync.py",
    "start_auto_sync.command",
    "auto_sync.log"
}

def run_cmd(cmd, cwd=TARGET_DIR):
    try:
        res = subprocess.run(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            shell=True
        )
        return res.returncode, res.stdout.strip(), res.stderr.strip()
    except Exception as e:
        return 1, "", str(e)

def get_directory_state(dir_path):
    """디렉토리 내 파일들의 수정 시간 및 크기 스냅샷 반환"""
    state = {}
    try:
        for root, dirs, files in os.walk(dir_path):
            # .git 및 무시 대상 폴더 건너뛰기
            dirs[:] = [d for d in dirs if d not in IGNORE_PATTERNS and not d.startswith('.git')]
            for f in files:
                if f in IGNORE_PATTERNS or f.endswith('.log') or f.startswith('.'):
                    continue
                full_path = os.path.join(root, f)
                try:
                    stat = os.stat(full_path)
                    state[full_path] = (stat.st_mtime, stat.st_size)
                except (OSError, IOError):
                    pass
    except Exception:
        pass
    return state

def has_git_changes():
    """git 상태 기준으로 실제 변경된 파일이 있는지 확인"""
    code, out, _ = run_cmd("git status --porcelain")
    return code == 0 and len(out.strip()) > 0

def get_changed_files_summary():
    """변경된 파일 목록 요약"""
    code, out, _ = run_cmd("git status --porcelain")
    if code == 0 and out.strip():
        lines = out.strip().split('\n')
        if len(lines) <= 3:
            return ", ".join([line.strip() for line in lines])
        else:
            return f"{lines[0].strip()} 외 {len(lines)-1}개 파일"
    return "파일 변경"

def perform_sync():
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    summary = get_changed_files_summary()
    
    print(f"\n[{now_str}] ⚡ 파일 변경 감지! ({summary})")
    print(f"[{now_str}] 🔄 GitHub 자동 동기화 시작...")
    
    # 1. git add
    run_cmd("git add .")
    
    # 2. git commit
    commit_msg = f"Auto sync: {summary} ({now_str})"
    code, out, err = run_cmd(f'git commit -m "{commit_msg}"')
    if code != 0:
        if "nothing to commit" in (out + err):
            print(f"[{now_str}] ℹ️ 커밋할 변경사항 없음")
            return
        print(f"[{now_str}] ❌ 커밋 실패: {err or out}")
        return
    print(f"[{now_str}] ✅ 커밋 완료: {commit_msg}")
    
    # 3. git pull --rebase (원격 최신화 충돌 방지)
    run_cmd("git pull --rebase origin main")
    
    # 4. git push
    code, out, err = run_cmd("git push origin main")
    if code == 0:
        print(f"[{now_str}] 🚀 GitHub 푸시 성공! 동기화 완료.")
    else:
        print(f"[{now_str}] ⚠️ 푸시 실패: {err or out}")
        print("     (첫 푸시인 경우 터미널에서 'git push -u origin main'을 1회 실행하여 인증을 완료해주세요)")

def main():
    print("=" * 65)
    print(" 🌟 GitHub 실시간 파일 변경 감지 동기화 프로그램")
    print(f" 📂 감시 폴더: {TARGET_DIR}")
    print(" ⚡ 파일이 수정/추가/삭제되면 즉시 감지하여 GitHub로 동기화합니다.")
    print(" 💡 프로그램을 종료하려면 [Ctrl + C]를 누르세요.")
    print("=" * 65)
    
    last_state = get_directory_state(TARGET_DIR)
    last_change_time = None
    pending_sync = False
    
    # 최초 실행 시 이미 변경된 파일이 있는지 1회 확인
    if has_git_changes():
        perform_sync()
        last_state = get_directory_state(TARGET_DIR)
    else:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 👁️ 파일 변경 대기 중...")
    
    try:
        while True:
            time.sleep(CHECK_INTERVAL)
            current_state = get_directory_state(TARGET_DIR)
            
            # 상태 변경 여부 확인
            if current_state != last_state:
                last_state = current_state
                last_change_time = time.time()
                pending_sync = True
                print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 📝 파일 수정 중 감지됨... (저장 대기)")
            
            # 디바운스 대기 시간이 지나면 실제 동기화 실행
            if pending_sync and last_change_time is not None:
                if (time.time() - last_change_time) >= DEBOUNCE_DELAY:
                    pending_sync = False
                    last_change_time = None
                    if has_git_changes():
                        perform_sync()
                        last_state = get_directory_state(TARGET_DIR)
                    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 👁️ 파일 변경 대기 중...")
                    
    except KeyboardInterrupt:
        print("\n\n👋 실시간 자동 동기화 프로그램이 종료되었습니다.")
        sys.exit(0)

if __name__ == "__main__":
    main()
