$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([35.8, 139], 8);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    // Two styles
    var defaultStyle = {
      color: '#2262CC',
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0
    };

    $.getJSON('../data/japan.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
          // Set the default style into layer
          layer.setStyle(defaultStyle);

          // Set the highlight style into layer when 'mouseover'
          (function(layer, properties) {
            layer.on('mouseover', function(e) {
              // Set the style with classified color
              layer.setStyle(getClassifiedStyle(feature.properties['POP-DENSITY'], 0, 3000));
            });
            layer.on('mouseout', function(e) {
              layer.setStyle(defaultStyle);
            });
          })(layer, feature.properties);
        }
      });
      geojson.addTo(map);
    });
  }

  function getClassifiedStyle(num, min, max) {
    // D3 Quantize to classfy into 3 range!
    var quantize = d3.scale.quantize().domain([min, max]).range(['low', 'middle', 'high']);
    var range = quantize(num);
    // 3 types of highlight color
    var color;
    switch (range) {
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

  initMap();

});
