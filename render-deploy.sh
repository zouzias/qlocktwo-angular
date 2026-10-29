#!/usr/bin/env bash
# Trigger a deploy of the latest commit on Render via the service's deploy hook
# (Render dashboard > Settings > Deploy Hook).
#
# Usage: RENDER_DEPLOY_HOOK_URL=https://api.render.com/deploy/srv-... ./render-deploy.sh
set -euo pipefail

if [[ -z "${RENDER_DEPLOY_HOOK_URL:-}" ]]; then
  echo "RENDER_DEPLOY_HOOK_URL is not set" >&2
  exit 1
fi

curl --fail --silent --show-error -X POST "$RENDER_DEPLOY_HOOK_URL"
echo
echo "Deploy triggered on Render"
