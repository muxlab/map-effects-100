$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  function iconHighlight(id) {
    var target = $('path#' + id);
    target.css({ strokeWidth: '8', stroke: '#ff618f' });
    setTimeout(function () {
      target.css({ strokeWidth: '4', stroke: '#a78194' });
    }, 1000);
  }

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map', {
      // Disable almost map operation
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      tap: false,
      keyboard: false,
      zoomControl: false
    }).setView([35.8, 139], 8);

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    // Get the geojson from ArcGIS Open Data Portal by Esri Japan
    // Check it out! => http://data.esrij.com/
    $.getJSON('../data/Shizuoka_100_waterside.geojson', function (data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          (function (lyr, properties) {
            var iconColor = '#a78194';
            var svgPath = 'M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z';
            var svgIcon = L.divIcon({
              className: 'svg-icon',
              html: '<svg class="mizube-svg" width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="mizube' + properties.NO_ + '" fill="none" stroke="' + iconColor + '" stroke-opacity="0.75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="' + svgPath + '"></path></svg>'
            });

            // Create photo content elements
            var title = $('<h3></h3>', {
              text: feature.properties.NO_ + '. ' + feature.properties['場所名'],
              class: 'photo-text'
            });
            var photo = $('<img>', {
              src: '../data/img/' + feature.properties['画像'],
              width: '100%'
            });
            var description = $('<p></p>', {
              text: feature.properties['説明'],
              class: 'photo-text'
            });
            var container = $('<div></div>', {
              id: 'container' + feature.properties.OBJECTID,
              class: 'photo-container'
            });

            // Watch the current scroll postion for scroll-driven map navigation!
            var areaHeight = $('.photo-container').height() + 50;
            var areaTop = (feature.properties.OBJECTID - 1) * areaHeight - 50; // -50 is a minor adjustment
            var areaBottom = areaTop + areaHeight - 50; // -50 is a minor adjustment

            layer.setIcon(svgIcon);
            container.append(title).append(photo).append(description);
            $('#photos').append(container);
            $('div#photos').scroll(function () {
              if ($(this).scrollTop() >= areaTop && $(this).scrollTop() < areaBottom) {
                $('.photo-container').css('opacity', 0.3);
                $('div#container' + feature.properties.OBJECTID).css('opacity', 1);
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0] + 0.015], 14);
                iconHighlight('mizube' + feature.properties.NO_);
              }
            });
          })(layer, feature.properties);
        }
      });
      $('div#container1').css('opacity', 1);
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);
    });
  }

  initMap();
});
