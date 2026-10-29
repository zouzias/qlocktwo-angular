# Multi-stage build for the application:
#   deps  - Node.js, Bower, Grunt, headless Chromium and all project dependencies
#   dev   - runs the `grunt serve` development server (used by docker-dev.sh)
#   build - lints, tests and builds dist/ (used by docker-build.sh)
#   serve - serves the production build with nginx (default, used by docker-serve.sh)
FROM node:lts-bookworm-slim AS deps

# git is needed by bower, chromium runs the Karma tests headless
RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates chromium \
    && rm -rf /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/chromium

RUN npm install -g bower grunt-cli

WORKDIR /app

# Install dependencies first so they are cached across source changes
COPY package.json package-lock.json bower.json .bowerrc ./
RUN bower install --allow-root && npm ci

FROM deps AS dev
COPY . .
# 9000: development server, 35729: livereload
EXPOSE 9000 35729
CMD ["grunt", "serve"]

FROM deps AS build
COPY . .
# Lint, test and build (same as CI)
RUN grunt

FROM nginx:stable-alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
