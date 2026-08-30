#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PLIST_PATH="$HOME/Library/LaunchAgents/com.beulittolii.yesan.autosync.plist"

echo "========================================================"
echo " 🌟 GitHub 실시간 자동 동기화 백그라운드 서비스 등록"
echo "========================================================"

# 기존 서비스가 있다면 먼저 중지
launchctl unload "$PLIST_PATH" 2>/dev/null

# plist 파일 생성
cat << EOF > "$PLIST_PATH"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.beulittolii.yesan.autosync</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>$DIR/auto_sync.py</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$DIR</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>$DIR/auto_sync.log</string>
    <key>StandardErrorPath</key>
    <string>$DIR/auto_sync.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
        <key>HOME</key>
        <string>$HOME</string>
    </dict>
</dict>
</plist>
EOF

# 서비스 등록 및 시작
launchctl load "$PLIST_PATH"

echo ""
echo "✅ 백그라운드 등록이 완료되었습니다!"
echo "✨ 이제 터미널 창을 닫아도 항상 백그라운드에서 파일 변경을 감지하여 GitHub로 자동 동기화합니다."
echo "🖥️ Mac을 껐다 켜도 자동으로 실행됩니다."
echo ""
echo "💡 동기화 기록은 'auto_sync.log' 파일에서 언제든 확인할 수 있습니다."
echo "💡 서비스를 중지하려면 'stop_background_service.command'를 실행하세요."
echo "========================================================"
