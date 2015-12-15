$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map', { zoomControl: false }).setView([35.75, 139.65], 10);

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    $.getJSON('../data/dummy-picts-rest.json', function(data) {
      $.each(data.data, function(i, val) {
        var date = new Date(Number(val.created_time)).getDate();
        var m = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var month = m[new Date(Number(val.created_time)).getMonth()];

        var content = '<div class="time-into-popup"><div class="time"><div class="date">' + date + '</div><div class="day">' + month + '</div></div></div>'
         + '<div class="pict-into-popup"><img class="pict" src="' + val.images.standard_resolution.url + '"></div>'
         + '<div class="comment-into-popup">' + val.comment + '</div>'
         + '<div class="likes-into-popup"><span class="likes-count"><i class="fa fa-heart likes-icon"></i>' + val.likes + '</span></div>'
        var pictures = L.marker(val.location).addTo(map)
          .bindPopup(content);
      });
    });
  }

  function getDay() {

  }

  initMap();

});
