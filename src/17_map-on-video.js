$(function () {
  var process1;
  var process2;
  var process3;
  var map;
  var car;
  var initPosition = [36.10832283444081, -115.17277836799622];

  var iconColor = '#f72d3f';
  var svgPath = 'M28.59,10.781h-2.242c-0.129,0-0.244,0.053-0.333,0.133c-0.716-1.143-1.457-2.058-2.032-2.633c-2-2-14-2-16,0C7.41,8.854,6.674,9.763,5.961,10.898c-0.086-0.069-0.19-0.117-0.309-0.117H3.41c-0.275,0-0.5,0.225-0.5,0.5v1.008c0,0.275,0.221,0.542,0.491,0.594l1.359,0.259c-1.174,2.619-1.866,5.877-0.778,9.14v1.938c0,0.553,0.14,1,0.313,1h2.562c0.173,0,0.313-0.447,0.313-1v-1.584c2.298,0.219,5.551,0.459,8.812,0.459c3.232,0,6.521-0.235,8.814-0.453v1.578c0,0.553,0.141,1,0.312,1h2.562c0.172,0,0.312-0.447,0.312-1l-0.002-1.938c1.087-3.261,0.397-6.516-0.775-9.134l1.392-0.265c0.271-0.052,0.491-0.318,0.491-0.594v-1.008C29.09,11.006,28.865,10.781,28.59,10.781zM7.107,18.906c-1.001,0-1.812-0.812-1.812-1.812s0.812-1.812,1.812-1.812s1.812,0.812,1.812,1.812S8.108,18.906,7.107,18.906zM5.583,13.716c0.96-2.197,2.296-3.917,3.106-4.728c0.585-0.585,3.34-1.207,7.293-1.207c3.953,0,6.708,0.622,7.293,1.207c0.811,0.811,2.146,2.53,3.106,4.728c-2.133,0.236-6.286-0.31-10.399-0.31S7.716,13.952,5.583,13.716zM24.857,18.906c-1.001,0-1.812-0.812-1.812-1.812s0.812-1.812,1.812-1.812s1.812,0.812,1.812,1.812S25.858,18.906,24.857,18.906z';
  var svgIcon = L.divIcon({
    className: 'svg-icon',
    html: '<svg class="car-svg" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="' + iconColor + '" fill-opacity="1" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="' + svgPath + '"></path></svg>'
  });

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  function moving() {
    var position = [36.10832283444081, -115.17277836799622];
    var d1 = 0.00002;
    clearInterval(process3);
    process1 = setInterval(function () {
      position[0] = position[0] + d1;
      car.setLatLng(position);
      map.setView(position);
    }, 250);
    setTimeout(function () {
      var d2 = 0.00001;
      clearInterval(process1);
      process2 = setInterval(function () {
        position[0] = position[0] + d2;
        car.setLatLng(position);
        map.setView(position);
      }, 250);
    }, 40000);
    setTimeout(function () {
      var d3 = 0.000001;
      clearInterval(process2);
      process3 = setInterval(function () {
        position[0] = position[0] + d3;
        car.setLatLng(position);
        map.setView(position);
      }, 250);
    }, 48000);
  }

  // Leaflet Map Init
  function initMap() {
    map = L.map('map', { closePopupOnClick: false, zoomControl: false }).setView(initPosition, 16);

    car = L.marker(initPosition).setIcon(svgIcon).addTo(map);

    L.tileLayer('//stamen-tiles-a.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'stamen-toner-hybrid',
      attribution: '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>. | Video from <a target="_top" href="http://mazwai.com/">Mazwai</a>.'
    }).addTo(map);

    $('#video').on('play', function () {
      moving();
      $('#video').off('play');
    });
    $('#video').on('ended', function () {
      this.play();
      moving();
    });
  }

  initMap();
});
