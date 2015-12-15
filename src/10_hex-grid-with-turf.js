
$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([36, 139], 5);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    var aggregations = [
      {
        aggregation: 'count',
        inField: '',
        outField: 'pt_count'
      }
    ];

    var svgIcon = L.divIcon({
      className: 'earthquakes',
      html: '<svg class="eq-svg" width="64px" height="64px" viewBox="-20 -20 64 64"><g><circle class="circles" opacity="0.4" r="2" transform="translate(0,0)"></circle></g></svg>'
    });

    $.getJSON('../data/earthquakes.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.setIcon(svgIcon);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);

      //Generates a hexgrid within the specified bbox.
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
      geojson.addTo(map);
    });
  }

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

  initMap();

});
