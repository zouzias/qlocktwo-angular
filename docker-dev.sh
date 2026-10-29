#!/usr/bin/env bash
# Run the `grunt serve` development server in Docker. The app/ and test/
# folders are mounted into the container, so edits on the host trigger a
# live reload in the browser.
#
# Usage: ./docker-dev.sh [port]   (default: 9000)
set -euo pipefail

cd "$(dirname "$0")"

IMAGE=qlocktwo-angular-dev
PORT="${1:-9000}"

docker build --target dev -t "$IMAGE" .

echo "Development server on http://localhost:$PORT (press Ctrl+C to stop)"
# The livereload port must be the same on the host, the page connects to it directly
docker run --rm -it \
  -p "$PORT:9000" \
  -p 35729:35729 \
  -v "$PWD/app:/app/app" \
  -v "$PWD/test:/app/test" \
  "$IMAGE"
