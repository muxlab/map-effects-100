<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
    <title>Map Effects 100</title>
    <link rel="shortcut icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
    <style>
        html, body, #map {
          height: 600px;
          font-family: "Avenir LT W01 35 Light", "Century Gothic", Helvetica, Arial, sans-serif;
          background-color: #000;
        }
        #title {
          position: absolute;
          z-index: 999;
          top: 15px;
          right: 25px;
          color: #fff;
        }

        /* CSS3 Animation for sizing svg icon */
        div.svg-icon > svg > path {
          animation: pulse 3s infinite;
          -webkit-animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0% {
            stroke-width: 6;
          }
          45% {
            stroke-width: 12;
          }
          100% {
            stroke-width: 6;
          }
        }
        @-webkit-keyframes pulse {
          0% {
            stroke-width: 6;
          }
          45% {
            stroke-width: 12;
          }
          100% {
            stroke-width: 6;
          }
        }

        /* Marker offset */
        .eq-svg {
          margin-top: -12px;
          margin-left: -12px;
        }
    </style>
  </head>

  <body>
    <div id="title"><p>05. SVG Marker Animation</p></div>
    <div id="map"></div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script>

    <script>
    $(function() {

      console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

      // Leaflet Map Init
      function initMap() {
        var map = L.map('map').setView([36, 139], 5);

        L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
          attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);

        var iconColor = "#f72d3f";
        var svgPath = 'M23.963,20.834L17.5,9.64c-0.825-1.429-2.175-1.429-3,0L8.037,20.834c-0.825,1.429-0.15,2.598,1.5,2.598h12.926C24.113,23.432,24.788,22.263,23.963,20.834z';
        var svgIcon = L.divIcon({
          className: 'svg-icon',
          html: '<svg class="eq-svg" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="none" stroke="' + iconColor + '" stroke-opacity="0.45" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="' + svgPath + '"></path></svg>'
        });

        $.getJSON('../data/earthquakes.geojson', function(data) {
          var geojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
              // Set the default style into layer
              layer.setIcon(svgIcon);
            }
          });
          map.fitBounds(geojson.getBounds());
          geojson.addTo(map);
        });
      }

      initMap();

    });
    </script>
  </body>
</html>
