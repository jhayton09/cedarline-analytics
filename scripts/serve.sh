#!/usr/bin/env bash
# Local review helper: stop any server on PORT, then start `next start` fresh.
# Restarting matters because `next build` replaces .next underneath a running server.
set -euo pipefail

PORT="${1:-3111}"
LOG="${2:-/tmp/cedarline-server.log}"

for pid in $(ss -ltnpH "sport = :$PORT" 2>/dev/null | grep -oP 'pid=\K[0-9]+' | sort -u); do
  kill "$pid" 2>/dev/null || true
done

for _ in $(seq 1 40); do
  ss -ltnH "sport = :$PORT" 2>/dev/null | grep -q . || break
  sleep 0.25
done

nohup npx next start -p "$PORT" >"$LOG" 2>&1 &
echo $! >"/tmp/cedarline-$PORT.pid"

for _ in $(seq 1 60); do
  if curl -fsS -o /dev/null "http://localhost:$PORT/"; then
    echo "serving on http://localhost:$PORT (pid $(cat "/tmp/cedarline-$PORT.pid"))"
    exit 0
  fi
  sleep 0.5
done

echo "server did not come up; see $LOG" >&2
exit 1
