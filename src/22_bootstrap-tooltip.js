$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([35, 138.5], 9);

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    $.getJSON('../data/Shizuoka_100_waterside.geojson', function (data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          var svgIcon = L.vectorIcon({
            className: 'leaflet-minimum-icon',
            svgHeight: 12,
            svgWidth: 12,
            type: 'circle',
            shape: {
              r: '4',
              cx: '6',
              cy: '6'
            },
            style: {
              fill: '#ff1493',
              stroke: '#fff',
              strokeWidth: 3
            }
          });
          layer.setIcon(svgIcon);
        }
      });
      geojson.addTo(map);
      geojson.eachLayer(function (layer) {
        var markerElm = $(layer._icon);
        markerElm.attr({
          'data-toggle': 'tooltip',
          'data-placement': 'top'
        });
        markerElm.tooltip({ title: layer.feature.properties['場所名'], container: 'body' });
      });
    });
  }
  initMap();
});
