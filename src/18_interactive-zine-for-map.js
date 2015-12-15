    $(function () {
      console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

      $('#map').on('click', function (e) {
        console.log(e);
        $('img.pict').css({ visibility: 'hidden', opacity: 0 });
        $('.leaflet-map-pane').css({ opacity: 1 });
      });

      // Leaflet Map Init
      function initMap() {
        var map = L.map('map', { closePopupOnClick: false, zoomControl: false }).setView([35.75, 139.65], 10);
        var icons = [];
        var iconColors = ['#ff00ff', '#89e200', '#00ffff'];
        var paths = ['M0,0h48v48h-48z', 'M0,0L48,48V-48z', 'M0,24a24,24 0 1,0 48,0a24,24 0 1,0 -48,0']; // Square, Triangle, Circle

        for (var i = 0; i < 3; i++) {
          icons[i] = L.divIcon({
            className: 'svg-icon',
            html: '<svg class="pt-svg" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="' + iconColors[i] + '" fill-opacity="0.75" stroke="none" d="' + paths[i] + '"></path></svg>'
          });
        }

        L.tileLayer('//stamen-tiles-a.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png', {
          maxZoom: 18,
          id: 'stamen-toner-hybrid'
        }).addTo(map);

        $.getJSON('../data/dummy-picts-rest.json', function (data) {
          $.each(data.data, function (index, val) {
            var pictures = L.marker(val.location).setIcon(icons[index]).addTo(map);

            $('#picts').append($('<img>').attr({ id: 'pict' + index, src: val.images.standard_resolution.url, class: 'pict' }).css({ top: -305 * index + 'px' }));
            pictures.on('click', function () {
              var id = 'pict' + index;
              $('#' + id).css({ visibility: 'visible', opacity: 1 });
              $('.leaflet-map-pane').css({ opacity: 0 });
            });
          });
        });
      }
      initMap();
    });