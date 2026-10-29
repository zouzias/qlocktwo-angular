#!/usr/bin/env bash
# Build command for Render (see render.yaml). Installs dependencies and builds
# dist/. Lint and tests are skipped since Render has no Chrome for Karma; CI
# runs them before Render deploys.
set -euo pipefail

cd "$(dirname "$0")"

npm ci
npx --yes bower install
npx grunt build
