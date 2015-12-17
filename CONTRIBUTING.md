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
* Install the dependencies on your app with `npm install`
* Create new html and js files into the `src` to work the eslint automatically with [gulp](https://github.com/muxlab/map-effects-100/blob/gh-pages/gulpfile.js)
  * including js file in html file:
      ```html    
      <!-- build:remove -->
      <script src="18_interactive-zine-for-map.js"></script>
      <!-- /build -->
      <script>/* jsFile 18 */</script>
      ```

* Run `gulp watch` from the command line. This will check your code into the `src` with [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
* add your new file in [index.html](index.html)
  ```js
  var infos = [
  {
    title: '1. Fade-in Highlight Style',
    filename: '01_fadein-highlight.html',
    imgUrl: 'assets/img/01.png'
  }
  ```

* After finishing coding, run `gulp build`
* Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)
