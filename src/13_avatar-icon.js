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
    var map = L.map('map', { closePopupOnClick: false }).setView([35.8, 139], 5);

    // Extend Leaflet Icon
    var AvatarIcon = L.Icon.extend({
      options: {
        className: 'leaflet-avator-icon', // Custom Icon Class
        iconSize: [40, 40], // Avatar Image Size
        iconAnchor: [20, 20], // Centralizing icon
        popupAnchor: [3, -20] // Centralizing popup
      }
    });

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);

    $.get('https://api.github.com/orgs/muxlab/members', function (res) {
      $.each(res, function (i, val) {
        var icon = new AvatarIcon({ iconUrl: val.avatar_url });
        // Placing at random
        L.marker([30.591 + (45.3122 - 30.591) * Math.random(), 129.339 + (145.49 - 129.339) * Math.random()], {
          alt: 'avator',
          icon: icon
        })
          .addTo(map)
          .bindPopup('<p><a target="_brank" href="' + val.html_url + '"><b>' + val.login + '</b></a></p>', { closeButton: false })
          .openPopup();
      });
    });
  }

  initMap();
});
