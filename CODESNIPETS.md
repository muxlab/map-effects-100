# Map Effects 100 Key Code Snipets

Cool tips to design UI/UX on your Map.

## Code Snipets

* [01_fadein-highlight.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/01_fadein-highlight.html)
```css
/* CSS3 Transition to fade-in highlight style */
svg.leaflet-zoom-animated > g > path {
  transition-property: fill, fill-opacity, stroke, stroke-opacity, stroke-width;
  transition-duration: 0.4s;
}
```
* [02_classified-highlightcolor.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/02_classified-highlightcolor.html)
```javascript
function getClassifiedStyle(num, min, max) {
  // D3 Quantize to classfy into 3 range!
  var quantize = d3.scale.quantize().domain([min, max]).range(['low', 'middle', 'high']);
  var range = quantize(num);
  // 3 types of highlight color
  var color;
  switch(range) {
      case 'low':
          color = '#ffe500';
          break;
      case 'middle':
          color = '#ff6500';
          break;
      case 'high':
          color = '#ff001b';
          break;
  }
  var style = {
    color: color,
    weight: 4,
    opacity: 0.6,
    fillOpacity: 0.65,
    fillColor: color
  };
  return style;
}
```
* [03_rising-popup.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/03_rising-popup.html)
```css
/* Rising Popup */
div.rising-popup {
  position: absolute;
  bottom: 30px;
  left: 50px;
  zIndex: 999;
  background-color: white;
  padding: 20px;
  opacity: 0.8;
  animation-duration: 0.4s;
  animation-name: rise;
  animation-iteration-count: 1;
}
/* Rising Animation */
@keyframes rise {
  0% {
    opacity: 0;
    bottom: -30px;
  }
  100% {
    opacity: 0.8;
    bottom: 30px;
  }
}
```
```javascript
// Create popup
var popup = $('<div></div>', {
  id: 'popup-' + properties['JIS-CODE'],
  class: 'rising-popup'
});
```
* [04_interlocking-legend.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/04_interlocking-legend.html)
```javascript
layer.on('mouseover', function (e) {
  // Set Label Style with class
  setLabelBold(d3Quantize(feature.properties['POP-DENSITY']));
  ...
});
```
* [05_svg-marker-animation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/05_svg-marker-action.html)
```css
/* CSS3 Animation for sizing svg icon */
div.svg-icon > svg > path {
  animation-duration: 3s;
  animation-name: pulse;
  animation-iteration-count: infinite;
}
@keyframes pulse {
  0% {
    stroke-width: 6;
  }
  45% {
    stroke-width: 12;
  }
  100% {
    stroke-width: 6;
  }
}
```
```javascript
var svgIcon = L.divIcon({
  className: 'svg-icon',
  html: '<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="none" stroke="' + iconColor + '" stroke-opacity="0.45" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="' + svgPath + '"></path></svg>'
});
```
* [06_binding-chart.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/06_binding-chart.html)
```javascript
(function(layer, properties) {
  // Leaflet events
  layer.on('mouseover', function (e) {
    layer.setStyle(highlightStyle);

    // Binding: Map -> Chart
    var activeSegments = [];
    $.each(chart.segments, function(i, seg) {
      if(seg.label === properties['ObjName']) {
        activeSegments.push(seg);
      }
    });
    chart.showTooltip(activeSegments); // Hack the chart.js! But we are not able to highlight the target segment in chart..
  });
  layer.on('mouseout', function (e) {
    layer.setStyle(defaultStyle);
    chart.showTooltip([]);
  });

  // Chart.js events
  $('canvas').on('mousemove', function (e) {
    layer.setStyle(defaultStyle);

    // Binding: Chart -> Map
    var activePoints = chart.getSegmentsAtEvent(e);
    if(activePoints.length > 0) {
      var targetLabel = activePoints[0].label;
      if(targetLabel === properties['ObjName']) {
        layer.setStyle(highlightStyle);
      }
    }
  });
  ...
  $('canvas').on('mouseout', function (e) {
    layer.setStyle(defaultStyle);
  });
})(layer, feature.properties);
```
* [07_raphael-animation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/07_raphael-animation.html)
```javascript
// Raphael Layer: Bezier & Pulse Animation
var b = new R.BezierAnim([e.latlng, [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]], {}, function() {
  var p = new R.Pulse(
      [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
      6,
      {'stroke': '#f72d3f', 'fill': '#f72d3f'},
      {'stroke': '#f72d3f', 'stroke-width': 1});
  map.addLayer(p);
  setTimeout(function() {
    map.removeLayer(b).removeLayer(p);
  }, 4500);
}, {});
map.addLayer(b);
```
* [08_time-animation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/08_time-animation.html)
```css
/* CSS3 Transition & Animation for sizing svg icon */
.circles {
  fill: #ff9c00;
  transition-property: r;
  transition-duration: 4s;
  animation-duration: 5s;
  animation-name: fade-out;
  animation-iteration-count: 1;
}
@keyframes fade-out {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
  }
}
```
```javascript
// Filter by time
if(tt > t && tt <= (t+dt)) {
  layer.setOpacity(1);
  var svgIcon = L.divIcon({
    className: 'earthquakes',
    html: '<svg width="64px" height="64px" viewBox="-20 -20 64 64"><g><circle class="circles" id="' + properties['code'] + '" opacity="0.4" r="1" transform="translate(0,0)"></circle></g></svg>'
  });
  layer.setIcon(svgIcon);
  // Set size by magnitude (you should use setTimeout to animate for sizing)
  setTimeout(function() {
    $('circle#' + properties['code']).attr('r', properties['mag']*2.5);
  }, 500);
  // Clear feature when finished animation
  setTimeout(function() {
    layer.setOpacity(0);
  }, 5000);
}
```
* [09_nearest-with-turf.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/09_nearest-with-turf.html)
```javascript
map.on('mousemove', function (e) {
  var point = {
    "type": "Feature",
    "properties": {
      "marker-color": "#0f0"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [e.latlng.lng, e.latlng.lat]
    }
  };

  // Turf.nearest!
  var nearest = turf.nearest(point, data);
  $('circle#' + nearest.properties['code']).attr('r', nearest.properties['mag']*2.5);
  $('circle#' + nearest.properties['code']).css('fill', '#ff0000');
  setTimeout(function() {
    $('circle#' + nearest.properties['code']).attr('r', 1);
    $('circle#' + nearest.properties['code']).css('fill', '#ff9c00');
  }, 1000);
});
```
* [10_hex-grid-with-turf.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/10_hex-grid-with-turf.html)
```javascript
  // Generates a hexgrid within the specified bbox.
  var b = geojson.getBounds();
  extend = [b.getSouthWest().lng , b.getSouthWest().lat , b.getNorthEast().lng, b.getNorthEast().lat]
  var hexgrid = turf.hexGrid(extend, 1, "kilometers");
  var hexgrid = turf.aggregate(hexgrid, data, aggregations);
  hexgrid.features.forEach(setStyle);

  var geojson = L.geoJson(hexgrid, {
    onEachFeature: function (feature, layer) {
      layer.setStyle(layer.feature.properties.withCount);
    }
  });
```
```javascript
  // hexgrid setStyle
  function setStyle(cell){
      cell.properties.withCount = {};
      var pt_count = cell.properties.pt_count;
      var _withCount = {
        color: '#4DFFFF',
        weight: 0.1,
        fill: '#4DFFFF',
        fillOpacity: pt_count/8.5
      };
      cell.properties.withCount = _withCount;
  }
```
* [11_scroll-driven-map-navigation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/11_scroll-driven-map-navigation.html)
```javascript
  // Watch the current scroll postion for scroll-driven map navigation!
  var areaHeight = $('.photo-container').height() + 50;
  var areaTop = (feature.properties['OBJECTID']-1) * areaHeight - 50; // -50 is a minor adjustment
  var areaBottom = areaTop + areaHeight - 50; // -50 is a minor adjustment
  $('div#photos').scroll(function() {
    if($(this).scrollTop() >= areaTop && $(this).scrollTop() < areaBottom) {
      $('.photo-container').css('opacity', 0.3);
      $('div#container' + feature.properties['OBJECTID']).css('opacity', 1);
      map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0] + 0.015], 14);
      iconHighlight('mizube' + feature.properties['NO_']);
    }
  });
```
* [12_map-driven-scroll-navigation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/12_map-driven-scroll-navigation.html)
```javascript
  // Highlight a marker and Scroll container
  layer.on('click', function (e) {
    iconHighlight('mizube' + feature.properties['NO_']);

    var duration = 2000;
    var position = scrollPosition + $('#container' + feature.properties['OBJECTID']).position().top - 50;
    console.log(feature.properties['OBJECTID'], feature.properties['NO_'], position);
    $('div#photos').animate({
      scrollTop: position
    }, {
      duration: duration,
      easing: 'easeInOutQuart' // required jQuery UI
    });
  });
```
* [13_avatar-icon.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/13_avatar-icon.html)
```css
/* Custom icon style */
.leaflet-avator-icon {
  border: 4px #fff solid; /* Inner border */
  border-radius: 40px; /* Making round */
  -webkit-border-radius: 40px;
  box-shadow: 0 0 0 2px #00D0CE, 0 8px 5px rgba(0,0,0,0.4); /* Outer border and shadow */
}
```
```javascript
// Extend Leaflet Icon
var AvatarIcon = L.Icon.extend({
  options: {
    className: 'leaflet-avator-icon', // Custom Icon Class
    iconSize: [40, 40], // Avatar Image Size
    iconAnchor: [20, 20], // Centralizing icon
    popupAnchor: [3, -20] // Centralizing popup
  }
});
```
* [14_custom-popup.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/14_custom-popup.html)
```css
/* Custom Popup */
.leaflet-popup {
  width: 300px;
  transition: opacity 1s linear;
}
.leaflet-popup-content-wrapper {
  width: 280px;
  border-radius: 0;
  float: left;
  color: white;
  background: rgba(255,100,0,0.8);
  box-shadow: 0 0 0 rgba(0,0,0,0);
}
.leaflet-popup-content-wrapper a {
  color: white;
  font-size: 12pt;
}
.leaflet-popup-content-wrapper h1 {
  color: white;
  font-size: 22pt;
}
.leaflet-popup-content-wrapper h2 {
  color: white;
  font-size: 18pt;
}
.leaflet-popup-content-wrapper h3 {
  color: white;
  font-size: 16pt;
}
.leaflet-popup-content-wrapper h4 {
  color: white;
  font-size: 14pt;
}
.leaflet-popup-content-wrapper h5 {
  color: white;
  font-size: 12pt;
}
.leaflet-popup-content-wrapper p {
  color: white;
  font-size: 12pt;
}
.leaflet-popup-tip-container {
  height: 70px;
  margin-bottom: 6px;
}
.leaflet-popup-tip {
  display: none;
  background: rgba(0,0,0,0);
  box-shadow: 0 0 0 rgba(0,0,0,0);
}
.leaflet-popup-tip-svg {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: block;
  width: 2px;
  height: 100px;
}
.leaflet-container a.leaflet-popup-close-button {
  color: white;
  padding: 9px 25px 0 0;
}
.leaflet-container a.leaflet-popup-close-button:hover {
  color: #ffe8a5;
}
```
```javascript
// Custom Popup
map.on('popupopen', function (e) {
  var svg = d3.select(".leaflet-popup-tip-container").append("svg")
      .attr({
        class: 'leaflet-popup-tip-svg',
        width: 2,
        height: 100,
      });
  var c1 = [1, 0];
  var c2 = [1, 91];
  var carray = [c1, c2];
  var line = d3.svg.line()
      .x(function(d) {return d[0];})
      .y(function(d) {return d[1];});
  var path = svg.append('path')
      .attr({
        'class': 'leaflet-popup-tip-path',
        'd': line(carray),
        'stroke': 'rgba(255,100,0,0.8)',
        'stroke-width': 2,
        'stroke-dashoffset': 91
      })
      .style("stroke-dasharray", "91")
      .style("stroke-linecap", "round");
  path.transition().delay(300).duration(1000).attr('stroke-dashoffset', 0);
});
map.on('popupclose', function (e) {
  e.popup._tipContainer.children[1].remove();
});
```
* [15_svg-border-generation.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/15_svg-border-generation.html)
```css
svg.leaflet-zoom-animated > g > path {
  /* for a border line generation */
  stroke-dashoffset: 700;
  stroke-dasharray: 700;
  stroke-linecap: round;
}
```
```javascript
// Border line generation
d3.selectAll('.leaflet-zoom-animated').selectAll('g').selectAll('path').transition().delay(300).duration(7000).style('stroke-dashoffset', 0);
```
* [16_responsive-popup.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/16_responsive-popup.html)
```css
/* Responsive Popup Style */
.leaflet-popup-content-wrapper {
  border-radius: 0;
  padding: 0;
}
.leaflet-popup-content {
  margin: 0;
}
.time {
  padding-top: 7px;
}
.date {
  font-size: 16pt;
  margin-bottom: -6px;
}
.pict-into-popup {
  overflow: hidden;
  cursor: pointer;
}
.pict {
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
}
.pict:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
.likes-into-popup {
  height: 14px;
  padding: 0 25px 25px 25px;
}
.likes-count {
  height: 14px;
  color: #777;
  cursor: pointer;
}
.likes-count:hover {
  color: red;
}
.likes-icon {
  display: inline-block;
  height: 14px;
  width: 15px;
  margin-right: 5px;
}
@media (max-width: 600px) {
  div.leaflet-popup.leaflet-zoom-animated {
    width: 150px;
  }
  .leaflet-popup-content {
    margin: 0 -1px 0 0;
    width: 150px;
  }
  .pict-into-popup {
    width: 150px;
  }
  .pict {
    width: 150px;
    height: 150px;
  }
  .time-into-popup {
    margin: 15px;
    position: absolute;
    z-index: 2;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: white;
    background-color: red;
    text-align: center;
    font-size: 7pt;
    font-weight: bold;
  }
  .comment-into-popup {
    color: red;
    width: 100px;
    padding: 25px;
    font-size: 9pt;
    font-weight: 100;
    word-wrap: break-word;
  }
}
@media (min-width: 600px) {
  div.leaflet-popup.leaflet-zoom-animated {
    width: 250px;
  }
  .leaflet-popup-content {
    margin: 0 -1px 0 0;
  }
  .pict-into-popup {
    width: 250px;
  }
  .pict {
    width: 250px;
    height: 250px;
  }
  .time-into-popup {
    margin: 25px;
    position: absolute;
    z-index: 2;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: white;
    background-color: red;
    text-align: center;
    font-size: 7pt;
    font-weight: bold;
  }
  .comment-into-popup {
    color: red;
    width: 250px;
    padding: 25px;
    font-size: 12pt;
    font-weight: 100;
    word-wrap: break-word;
  }
}
```
```javascript
var content = '<div class="time-into-popup"><div class="time"><div class="date">' + date + '</div><div class="day">' + month + '</div></div></div>'
 + '<div class="pict-into-popup"><img class="pict" src="' + val.images.standard_resolution.url + '"></div>'
 + '<div class="comment-into-popup">' + val.comment + '</div>'
 + '<div class="likes-into-popup"><span class="likes-count"><i class="fa fa-heart likes-icon"></i>' + val.likes + '</span></div>'
var pictures = L.marker(val.location).addTo(map)
  .bindPopup(content);
```
* [17_map-on-video.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/17_map-on-video.html)
```css
#bg {
  height: 750px;
  position: absolute;
}
#video {
  max-height: 100%;
  width: auto;
  transform: translateX(0px);
}
#map {
  opacity: 0.7;
}
.leaflet-container {
  background: rgba(0,0,0,0);
}
```
* [18_interactive-zine-for-map.html)](http://muxlab.github.io/map-effects-100/Leaflet/18_interactive-zine-for-map.html)
```css
#picts > img {
  cursor: pointer;
  visiblity: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s linear;
  position: relative;
  z-index: 9999;
  height: 100%;
  width: 100%;
}
```
```javascript
$('#picts').append($('<img>').attr({ id: 'pict' + index, src: val.images.standard_resolution.url, class: 'pict' }).css({ top: ($('#map').height() + 5) * -1 * index + 'px' }));
pictures.on('click', function () {
  var id = 'pict' + index;
  $('#' + id).css({ visibility: 'visible', opacity: 1 });
  $('.leaflet-map-pane').css({ opacity: 0 });
});
```
* [19_transforming-marker-into-frame.html](http://muxlab.github.io/map-effects-100/Leaflet/19_transforming-marker-into-frame.html)
```javascript
pictures.on('click', function (e) {
  map.panTo(e.target._latlng);
  if (selectedPicture !== undefined) {
    selectedPicture.target._icon.style.width = '60px';
    selectedPicture.target._icon.style.height = '60px';
    selectedPicture.target._icon.style.marginLeft = '-30px';
    selectedPicture.target._icon.style.marginTop = '-30px';
    selectedPicture.target._icon.style.zIndex = originalZIndex;
  }
  selectedPicture = e;
  originalZIndex = e.target._icon.style.zIndex;
  e.target._icon.style.width = '450px';
  e.target._icon.style.height = '450px';
  e.target._icon.style.marginLeft = '-225px';
  e.target._icon.style.marginTop = '-225px';
  e.target._icon.style.zIndex = '100000';
});
```
* [20_bouncing-popup.html](http://muxlab.github.io/map-effects-100/Leaflet/20_bouncing-popup.html)
```css
@keyframes bound {
  50% {
    transform: scaleY(1.5);
  }
  55% {
    transform: scaleX(1.2);
  }
  65% {
    transform: scaleY(1.1);
  }
  75% {
    transform: scaleX(1.1);
  }
  85% {
    transform: scaleY(1.05);
  }
  95% {
    transform: scaleX(1.05);
  }
}
```
* [21_blurred-background.html](http://muxlab.github.io/map-effects-100/Leaflet/21_blurred-background.html)
```js
$('img.leaflet-tile').css('filter', 'blur(10px)');
$('img.leaflet-tile').css('-webkit-filter', 'blur(10px)');
```
* [22_bootstrap-tooltip.html](http://muxlab.github.io/map-effects-100/Leaflet/22_bootstrap-tooltip.html)
```js
geojson.eachLayer(function (layer) {
  var markerElm = $(layer._icon);
  markerElm.attr({
    'data-toggle': 'tooltip',
    'data-placement': 'top'
  });
  markerElm.tooltip({ title: layer.feature.properties['場所名'], container: 'body' });
});
```
* [23_vignetting-map.html](http://muxlab.github.io/map-effects-100/Leaflet/23_vignetting-map.html)
```css
#map {
  background-color: #000;
}
#vignette {
  top: 0;
  position: absolute;
  width: 100%;
  -moz-box-shadow: inset 0 0 10em 6em #000;
  -webkit-box-shadow: inset 0 0 10em 6em #000;
  box-shadow: inset 0 0 10em 6em #000;
  content: "";
  pointer-events: none;
}
```
