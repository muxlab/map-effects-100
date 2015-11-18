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
* [10_hex-grid-with-truf.html](https://github.com/muxlab/map-effects-100/blob/gh-pages/Leaflet/10_hex-grid-with-truf.html)
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
