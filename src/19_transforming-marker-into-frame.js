$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var selectedPicture;
    var originalZIndex;
    var map = L.map('map', { zoomControl: false }).setView([35.75, 139.65], 11);

    // Extend Leaflet Icon
    var AvatarIcon = L.Icon.extend({
      options: {
        className: 'leaflet-avator-icon', // Custom Icon Class
        iconSize: [60, 60], // Avatar Image Size
        iconAnchor: [30, 30], // Centralizing icon
        popupAnchor: [3, -20] // Centralizing popup
      }
    });

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    map.on('click', function () {
      if (selectedPicture !== undefined) {
        selectedPicture.target._icon.style.width = '60px';
        selectedPicture.target._icon.style.height = '60px';
        selectedPicture.target._icon.style.marginLeft = '-30px';
        selectedPicture.target._icon.style.marginTop = '-30px';
        selectedPicture.target._icon.style.zIndex = originalZIndex;
      }
    });

    $.getJSON('../data/dummy-picts-rest.json', function (data) {
      $.each(data.data, function (i, val) {
        var icon = new AvatarIcon({ iconUrl: val.images.standard_resolution.url });

        var pictures = L.marker(val.location, { icon: icon }).addTo(map);
        pictures.on('click', function (e) {
          map.panTo(e.target._latlng);
          if (selectedPicture !== undefined) {
            selectedPicture.target._icon.style.width = '60px';
            selectedPicture.target._icon.style.height = '60px';
            selectedPicture.target._icon.style.marginLeft = '-30px';
            selectedPicture.target._icon.style.marginTop = '-30px';
            selectedPicture.target._icon.style.zIndex = originalZIndex;
          }
          selectedPicture = e;
          originalZIndex = e.target._icon.style.zIndex;
          e.target._icon.style.width = '450px';
          e.target._icon.style.height = '450px';
          e.target._icon.style.marginLeft = '-225px';
          e.target._icon.style.marginTop = '-225px';
          e.target._icon.style.zIndex = '100000';
        });
      });
    });
  }

  initMap();
});
