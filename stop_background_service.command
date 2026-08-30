#!/bin/bash
PLIST_PATH="$HOME/Library/LaunchAgents/com.beulittolii.yesan.autosync.plist"

echo "========================================================"
echo " 🛑 GitHub 자동 동기화 백그라운드 서비스 중지"
echo "========================================================"

if [ -f "$PLIST_PATH" ]; then
    launchctl unload "$PLIST_PATH" 2>/dev/null
    rm -f "$PLIST_PATH"
    echo "✅ 백그라운드 서비스가 중지 및 삭제되었습니다."
else
    echo "ℹ️ 실행 중인 백그라운드 서비스가 없습니다."
fi

echo "========================================================"
