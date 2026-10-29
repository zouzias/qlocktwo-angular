#!/usr/bin/env bash
# Build the application and serve the production build with nginx in Docker.
#
# Usage: ./docker-serve.sh [port]   (default: 8080)
set -euo pipefail

cd "$(dirname "$0")"

IMAGE=qlocktwo-angular
PORT="${1:-8080}"

docker build --target serve -t "$IMAGE" .

echo "Serving on http://localhost:$PORT (press Ctrl+C to stop)"
docker run --rm -it -p "$PORT:80" "$IMAGE"
