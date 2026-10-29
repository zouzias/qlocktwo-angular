#!/usr/bin/env bash
# Build the application inside a Docker container and copy dist/ to the host.
#
# Usage: ./docker-build.sh [output-dir]   (default: ./dist)
set -euo pipefail

cd "$(dirname "$0")"

IMAGE=qlocktwo-angular-build
OUT_DIR="${1:-dist}"

docker build --target build -t "$IMAGE" .

container=$(docker create "$IMAGE")
trap 'docker rm -f "$container" >/dev/null' EXIT

rm -rf "$OUT_DIR"
docker cp "$container:/app/dist" "$OUT_DIR"

echo "Build output written to $OUT_DIR/"
