# How To Contributing

* Map is Leaflet.
* 1 app, 1 html file.
* Minimum codes.
* Application title and number into `<div id="title"><p>09. Search Nearest with Turf</p></div>`.
* You should not use third-party libraries rashly.
* Application file name is `[No.]_[Short title].html`
* Application title in a file name should be separated by a hyphen (`-`).
* Update [README.md](https://github.com/muxlab/map-effects-100/blob/gh-pages/README.md) and [CODESNIPETS.md](https://github.com/muxlab/map-effects-100/blob/gh-pages/CODESNIPETS.md).
* Note the library or the leaflet plug-in used in your application into the [list](https://github.com/muxlab/map-effects-100#library--leaflet-plugin) in README.
* It is BETTER that the app can be accessed via HTTPS.

## Code Style

* We try to follow the [AirBNB JavaScript code style](https://github.com/airbnb/javascript/tree/master/es5) and use a lint.
* We do not use ES6 features.

## Development Instructions

1. [Fork and clone](https://help.github.com/articles/fork-a-repo) Map Effects 100
* `cd` into the `map-effects-100` folder
* Install the dependencies on your app with `npm install --save` (option)
* Create the `dist` folder into the `Leaflet` folder
* Create new html file into the `Leaflet` and new js file into the `Leaflet/dist` to work the eslint automatically with [gulp](https://github.com/muxlab/map-effects-100/blob/gh-pages/gulpfile.js)
* Run `gulp watch` from the command line. This will check your code into the `Leaflet/dist` with [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
* Take your js file into `<script>` in html file after finishing coding
* Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)
