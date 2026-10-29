## qlocktwo-angular [![CI](https://github.com/zouzias/qlocktwo-angular/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/zouzias/qlocktwo-angular/actions/workflows/ci.yml)

A [Qlocktwo](http://www.qlocktwo.com) front end in [AngularJS](https://angularjs.org) that displays the current time using English words.

**▶ Try it live: [qlocktwo-angular.onrender.com](https://qlocktwo-angular.onrender.com)** — no installation needed.

Click on the Qlocktwo to toggle fullscreen.

## Requirements

* [Node.js](https://nodejs.org) 18 or newer
* [Bower](https://bower.io) and [Grunt CLI](https://gruntjs.com): `npm install -g bower grunt-cli`
* Chrome (the tests run in headless Chrome via Karma)

## Build & development

### 1. Install the dependencies

From the repository root:

```
bower install
npm install
```

`bower install` puts the front-end libraries (AngularJS, Bootstrap, d3, ...) in
`bower_components/`, and `npm install` puts the build tooling in `node_modules/`.

### 2. Serve the application for development

```
grunt serve
```

This starts a development server on http://localhost:9000 and opens it in your
browser. Grunt watches the files under `app/` and reloads the page when you
change them. Press `Ctrl+C` to stop the server.

The server listens on `0.0.0.0`, so other devices on your network can also open
it at `http://<your-ip>:9000`.

### 3. Build the application for production

```
grunt build
```

The minified, production-ready application is written to `dist/`.

### 4. Serve the production build

To build and preview the production bundle on http://localhost:9000:

```
grunt serve:dist
```

The `dist/` folder contains only static files, so you can also serve it with any
static web server, for example:

```
python3 -m http.server 8080 --directory dist
```

and then open http://localhost:8080.

### Building with Docker

If you have [Docker](https://www.docker.com) but don't want to install Node.js,
Bower, Grunt or Chrome locally, run:

```
./docker-build.sh
```

This lints, tests and builds the application inside a container (see
`Dockerfile`) and copies the result to `dist/`. Pass a directory as the first
argument to write the output somewhere else.

To serve the application from Docker instead:

| Command                  | Description                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `./docker-serve.sh`      | Build and serve the production bundle with nginx on http://localhost:8080                    |
| `./docker-dev.sh`        | Run the `grunt serve` development server on http://localhost:9000, reloading on edits in `app/` |

Both scripts take an optional port as the first argument, e.g. `./docker-serve.sh 3000`.
Press `Ctrl+C` to stop the server.

### Deploying to Render

The app deploys to [Render](https://render.com) as a static site, configured in
`render.yaml`. The live deployment is at
https://qlocktwo-angular.onrender.com. To deploy your own copy:

1. In the Render dashboard, choose **New > Blueprint** and select this repository.
2. Render builds with `./render-build.sh` (installs dependencies and runs
   `grunt build`) and publishes `dist/`.

Pushes to `master` are deployed automatically once CI passes. To trigger a
deploy by hand, copy the deploy hook URL from the service's settings and run:

```
RENDER_DEPLOY_HOOK_URL=https://api.render.com/deploy/srv-... ./render-deploy.sh
```

### Other commands

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| `grunt test` | Run the Karma/Jasmine unit tests (also `npm test`) |
| `grunt`      | Lint, test and build (what CI runs)                |

## Project layout

```
app/
  scripts/
    app.js                         # module and routes
    controllers/qlocktwo.js        # renders the letter grid
    services/currenttimeservice.js # refreshes the time every 10 seconds
    services/timetophrases.js      # maps a time to English phrases
    services/lettergridservice.js  # letter grid and highlighted cells
  views/                           # qlocktwo and about views
test/
  karma.conf.js
  spec/                            # unit tests
```

## Customization

To display the time in another language, edit the phrases in
`app/scripts/services/timetophrases.js` and the letters in
`app/scripts/services/lettergridservice.js` to match. To generate a new
letter grid, see [qlocktwo-grid-generator](https://github.com/zouzias/qlocktwo-grid-generator).

## See also

* A project for generating letter grids: [qlocktwo-grid-generator](https://github.com/zouzias/qlocktwo-grid-generator)
* Deploying the application to Heroku: [qlocktwo-angular-deploy](https://github.com/zouzias/qlocktwo-angular-deploy)

## License

[Apache License 2.0](LICENSE)
