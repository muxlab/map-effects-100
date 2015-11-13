# RaphaelLayer
RaphaelLayer is the combination of [Leaflet](http://leaflet.cloudmade.com) and [Raphael](http://raphaeljs.com) to allow a Raphael's `paper` object to overlay a Leaflet's `map` object.

## Why? Leaflet already has an SVG layer.
[Raphael](http://raphaeljs.com) is great for handling SVG animations. [Leaflet](http://leaflet.cloudmade.com) is great for custom mapping. By combining Raphael's animations with Leaflet's mapping, you can produce some powerful visualisations.

Leaflet's Path SVG layer is good, however it is difficult to do advanced animations with it.

## Dependencies
RaphaelLayer has two dependencies:

 1. [Raphael](http://raphaeljs.com)
 2. [Leaflet](http://leaflet.cloudmade.com)

## Using
If you don't need to modify/build any changes into RaphaelLayer, just download and include the `dist/rlayer.js`.

We've followed the naming convention of Leaflet by using the prefix `R.`. For example, to use RaphaelLayer's Marker just add a new layer as you would normally:

```
map.addLayer(new R.Marker(latlng));
```
To modify the marker's attributes, such as fill, stroke etc, just pass regular [Raphael style attributes](http://raphaeljs.com/reference.html#Element.attr) through like this:

```
map.addLayer(new R.Marker(latlng, {'fill': '#fff', 'stroke': '#000'));
```

## Examples
There are some examples in the `debug` folder.

## Building
The build system borrows the same method from Leaflet and is powered by [Node.js](http://nodejs.org), [Jake](https://github.com/mde/jake), [JSHint](http://github.com/jshint/node-jshint) and [UglifyJS](https://github.com/mishoo/UglifyJS). The easiest way to install it:

 1. [Download and install Node](http://nodejs.org)
 2. Run the following commands in the command line:
 
```
npm install
```
 
Once this has completed, just run `jake` inside the RaphaelLayer directory. This will check the source files for Javascript errors and inconsistencies, and then combine and compress it to the `dist` folder.