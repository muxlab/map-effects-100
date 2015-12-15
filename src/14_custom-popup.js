$(function() {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map', { closePopupOnClick: false }).setView([35.8, 139], 5);

    //** Custom Popup **//
    map.on('popupopen', function (e) {
      var svg = d3.select(".leaflet-popup-tip-container").append("svg")
          .attr({
            class: 'leaflet-popup-tip-svg',
            width: 2,
            height: 100,
          });
      var c1 = [1, 0];
      var c2 = [1, 91];
      var carray = [c1, c2];
      var line = d3.svg.line()
          .x(function(d) {return d[0];})
          .y(function(d) {return d[1];});
      var path = svg.append('path')
          .attr({
            'class': 'leaflet-popup-tip-path',
            'd': line(carray),
            'stroke': 'rgba(255,100,0,0.8)',
            'stroke-width': 2,
            'stroke-dashoffset': 91
          })
          .style("stroke-dasharray", "91")
          .style("stroke-linecap", "round");
      path.transition().delay(300).duration(1000).attr('stroke-dashoffset', 0);
    });
    map.on('popupclose', function (e) {
      e.popup._tipContainer.children[1].remove();
    });

    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'osm'
    }).addTo(map);
    // Extend Leaflet Icon
    var AvatarIcon = L.Icon.extend({
      options: {
        className: 'leaflet-avator-icon', // Custom Icon Class
        iconSize: [40, 40], // Avatar Image Size
        iconAnchor: [20, 20], // Centralizing icon
        popupAnchor: [3, -20] // Centralizing popup
      }
    });
    $.get('https://api.github.com/orgs/muxlab/members', function(res) {
      console.log(res);
      var latlng = [0, 139];
      $.each(res, function(i, val) {
        console.log(val.avatar_url);
        var icon = new AvatarIcon({iconUrl: val.avatar_url});
        // Placing at random
        L.marker([30.591 + (45.3122 - 30.591 ) * Math.random(), 129.339 + (145.49 - 129.339)  * Math.random()], {
          alt: 'avator',
          icon: icon
        })
          .addTo(map)
          .bindPopup('<h1>This is</h1><h3>a custom popup</h3><p><a target="_brank" href="' + val.html_url + '"><b>' + val.login + '</b><img style="margin-left:10px; top:5px; position:relative;" src="../img/github.svg" /></a></p>');
      });
    });
  }
  initMap();
});
