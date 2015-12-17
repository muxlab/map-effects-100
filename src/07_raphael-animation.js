$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');
  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([36, 139], 5);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    $.getJSON('../data/earthquakes.geojson', function(data) {
      var beforePath = '';
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.setOpacity(0);

          // Set the sizing style into layer when 'click'
          (function(layer, properties) {
            map.on('click', function (e) {
              if(feature.properties['mag'] > 6) {
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
              }
            });
          })(layer, feature.properties);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);
    });
  }

  initMap();

});
