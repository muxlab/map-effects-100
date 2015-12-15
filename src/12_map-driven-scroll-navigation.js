$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Watch the postion for scrollable container
  var scrollPosition = 0;
  $('div#photos').scroll(function() {
    scrollPosition = $(this).scrollTop();
  });

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([35.8, 139], 8);

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    // Get the geojson from ArcGIS Open Data Portal by Esri Japan
    // Check it out! => http://data.esrij.com/
    $.getJSON('../data/Shizuoka_100_waterside.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          (function(layer, properties) {
            var iconColor = '#a78194';
            var svgPath = 'M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z';
            var svgIcon = L.divIcon({
              className: 'svg-icon',
              html: '<svg class="mizube-svg" width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="mizube' + properties['NO_'] + '" fill="none" stroke="' + iconColor + '" stroke-opacity="0.75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="' + svgPath + '"></path></svg>'
            });
            layer.setIcon(svgIcon);

            // Highlight a marker and Scroll container
            layer.on('click', function (e) {
              iconHighlight('mizube' + feature.properties['NO_']);

              var duration = 2000;
              var position = scrollPosition + $('#container' + feature.properties['OBJECTID']).position().top - 50;
              console.log(feature.properties['OBJECTID'], feature.properties['NO_'], position);
              $('div#photos').animate({
                scrollTop: position
              }, {
                duration: duration,
                easing: 'easeInOutQuart' // required jQuery UI
              });
            });

            // Create photo content elements
            var title = $('<h3></h3>', {
              text: feature.properties['NO_'] + '. ' + feature.properties['場所名'],
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
              id: 'container' + feature.properties['OBJECTID'],
              class: 'photo-container',
              on: {
                click: function(e) {
                  map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0] + 0.015], 14);
                  iconHighlight('mizube' + feature.properties['NO_']);
                }
              }
            });
            container.append(title).append(photo).append(description);
            $('#photos').append(container);
          })(layer, feature.properties);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);
    });
  }

  function iconHighlight(id) {
    var target = $('path#' + id);
    target.css({strokeWidth: '8', stroke: '#ff618f'});
    setTimeout(function() {
      target.css({strokeWidth: '4', stroke: '#a78194'});
    }, 1000);
  }

  initMap();

});
