var process1;
var process2;
var process3;
var map;
var car;
var track;
var initPosition = [36.10832283444081, -115.17277836799622];

$(function () {
  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  function moving() {
    var position = [36.10832283444081, -115.17277836799622];
    var d1 = 0.00002;
    clearInterval(process3);
    process1 = setInterval(function () {
      position[0] = position[0] + d1;
      car.setLatLng(position);
      track.addLatLng(position);
      map.setView(position);
    }, 250);
    setTimeout(function () {
      var d2 = 0.00001;
      clearInterval(process1);
      process2 = setInterval(function () {
        position[0] = position[0] + d2;
        car.setLatLng(position);
        track.addLatLng(position);
        map.setView(position);
      }, 250);
    }, 40000);
    setTimeout(function () {
      var d3 = 0.000001;
      clearInterval(process2);
      process3 = setInterval(function () {
        position[0] = position[0] + d3;
        car.setLatLng(position);
        track.addLatLng(position);
        map.setView(position);
      }, 250);
    }, 48000);
  }

  // Leaflet Map Init
  function initMap() {
    var icon = L.vectorIcon({
      className: 'leaflet-minimum-icon',
      svgHeight: 24,
      svgWidth: 24,
      type: 'circle',
      shape: {
        r: '6',
        cx: '12',
        cy: '12'
      },
      style: {
        fill: '#ff1493',
        stroke: '#fff',
        strokeWidth: 3
      }
    });

    map = L.map('map', { closePopupOnClick: false, zoomControl: false }).setView(initPosition, 18);

    car = L.marker(initPosition).setIcon(icon).addTo(map);
    track = L.polyline([initPosition], { color: '#ff1493', weight: 4 }).addTo(map);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    moving();
  }
  initMap();
});
