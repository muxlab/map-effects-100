$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map', { zoomControl: false }).setView([35, 138.5], 9);
    var modal = $('#modal-wrapper');

    map.on('click', function () {
      modal.css('display', 'none');

      map.dragging.enable();
      map.touchZoom.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();

      $('img.leaflet-tile').css('filter', 'blur(0)');
      $('img.leaflet-tile').css('-webkit-filter', 'blur(0)');
    });

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
          layer.setIcon(svgIcon).bindPopup('<img class="avator" src="../data/img/' + feature.properties['画像'] + '">', { closeButton: false });

          layer.on('click', function () {
            map.setView(this._latlng);

            map.dragging.disable();
            map.touchZoom.disable();
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
            map.boxZoom.disable();
            // map.tap.disable();
            // map.keyboard.disable();
            // map.zoomControl.disable();

            $('#modal').html('<h3>' + feature.properties.NO_ + '. ' + feature.properties['場所名'] + '</h3><p>' + feature.properties['説明'] + '</p>');
            modal.css('display', 'block');

            setTimeout(function () {
              $('img.leaflet-tile').css('filter', 'blur(10px)');
              $('img.leaflet-tile').css('-webkit-filter', 'blur(10px)');
            }, 300);
          });
        }
      });
      geojson.addTo(map);
    });
  }
  initMap();
});
