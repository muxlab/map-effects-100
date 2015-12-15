$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map', { zoomControl: false }).setView([36, 139], 5);

    // Two styles
    var defaultStyle = {
      class: 'japan-line',
      color: '#2262CC',
      weight: 1,
      opacity: 0.6,
      fillOpacity: 0
    }
    var highlightStyle = {
      color: '#ff6500',
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: '#ff6500'
    };

    $.getJSON('../data/japan.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          // Set the default style into layer
          layer.setStyle(defaultStyle);

          (function(layer, properties) {
            layer.on('mouseover', function (e) {
              layer.setStyle(highlightStyle);
            });
            layer.on('mouseout', function (e) {
              layer.setStyle(defaultStyle);
            });
          })(layer, feature.properties);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);

      // Border line generation
      d3.selectAll('.leaflet-zoom-animated').selectAll('g').selectAll('path').transition().delay(300).duration(7000).style('stroke-dashoffset', 0);
      setTimeout(function() {
        d3.selectAll('.leaflet-zoom-animated').selectAll('g').selectAll('path').style('stroke-dasharray', 0);
      }, 3700);
    });
  }

  initMap();

});
