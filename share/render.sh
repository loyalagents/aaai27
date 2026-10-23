#!/bin/sh
# Renders share/card.html to share-card.png (1200x630) with headless Chrome.
# Usage: share/render.sh [path-to-chrome]
set -eu

here=$(cd "$(dirname "$0")" && pwd)
chrome=${1:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}

"$chrome" --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$here/../share-card.png" "file://$here/card.html"
