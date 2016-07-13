$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  L.Map = L.Map.extend({
    openPopup: function (popup) {
      // this.closePopup();  // just comment this
      this._popup = popup;
      return this.addLayer(popup).fire('popupopen', {
        popup: this._popup
      });
    }
  });

  // Leaflet Map Init
  function initMap() {
    var contents = ['A', 'B', 'C'];
    var map = L.map('map', { zoomControl: false }).setView([35.75, 139.65], 10);
    var boundaryStyle = {
      class: 'boundaries',
      fillColor: '#fff',
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    };

    $.getJSON('../data/japan.geojson', function (data) {
      var boundaries = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.setStyle(boundaryStyle);
        }
      }).addTo(map);
      map.fitBounds(boundaries.getBounds());
    });

    $.each(contents, function (i, content) {
      var icon = L.vectorIcon({
        className: 'leaflet-minimum-icon',
        svgHeight: 4,
        svgWidth: 4,
        type: 'circle',
        shape: {
          r: '2',
          cx: '2',
          cy: '2'
        },
        style: {
          fill: '#1ec8ff',
          stroke: '#fff',
          strokeWidth: 0
        }
      });
      L.marker([30.591 + (45.3122 - 30.591) * Math.random(), 129.339 + (145.49 - 129.339) * Math.random()], { icon: icon }).addTo(map)
        .bindPopup(content).openPopup();
    });
  }

  initMap();
});
