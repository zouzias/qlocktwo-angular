## qlocktwo-angular [![CI](https://github.com/zouzias/qlocktwo-angular/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/zouzias/qlocktwo-angular/actions/workflows/ci.yml)

A [Qlocktwo](http://www.qlocktwo.com) front end in [AngularJS](https://angularjs.org) that displays the current time using English words.

Click on the Qlocktwo to toggle fullscreen.

## Requirements

* [Node.js](https://nodejs.org) 18 or newer
* [Bower](https://bower.io) and [Grunt CLI](https://gruntjs.com): `npm install -g bower grunt-cli`
* Chrome (the tests run in headless Chrome via Karma)

## Build & development

Install the dependencies:

```
bower install
npm install
```

Then:

| Command            | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `grunt serve`      | Start a dev server with live reload on http://localhost:9000 |
| `grunt test`       | Run the Karma/Jasmine unit tests (also `npm test`)           |
| `grunt build`      | Build the production bundle into `dist/`                     |
| `grunt serve:dist` | Build and serve the production bundle                        |
| `grunt`            | Lint, test and build (what CI runs)                          |

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
