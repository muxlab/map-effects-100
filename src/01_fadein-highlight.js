$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([36, 139], 5);

    // Two styles
    var defaultStyle = {
      color: '#2262CC',
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0
    };
    var highlightStyle = {
      color: '#ff6500',
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: '#ff6500'
    };

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    $.getJSON('../data/japan.geojson', function (data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          // Set the default style into layer
          layer.setStyle(defaultStyle);

          // Set the highlight style into layer when 'mouseover'
          (function () {
            layer.on('mouseover', function () {
              layer.setStyle(highlightStyle);
            });
            layer.on('mouseout', function () {
              layer.setStyle(defaultStyle);
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
