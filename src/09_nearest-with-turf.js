$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([36, 139], 5);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    $.getJSON('../data/earthquakes.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          (function(layer, properties) {
            var svgIcon = L.divIcon({
              className: 'earthquakes',
              html: '<svg class="eq-svg" width="64px" height="64px" viewBox="-20 -20 64 64"><g><circle class="circles" id="' + properties['code'] + '" opacity="0.4" r="1" transform="translate(0,0)"></circle></g></svg>'
            });
            layer.setIcon(svgIcon);
          })(layer, feature.properties);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);

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
        d3.select('circle#' + nearest.properties['code'])
          .transition()
          .delay(0)
          .duration(1000)
          .attr('r', nearest.properties['mag']*2.5);
        $('circle#' + nearest.properties['code']).css('fill', '#ff0000');
        setTimeout(function() {
          d3.select('circle#' + nearest.properties['code'])
            .transition()
            .delay(0)
            .duration(1000)
            .attr('r', 1);
          $('circle#' + nearest.properties['code']).css('fill', '#ff9c00');
        }, 1000);
      });
    });
  }

  initMap();

});
