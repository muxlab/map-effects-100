$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([36, 139], 5);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    $.getJSON('../data/earthquakes.geojson', function(data) {
      // Init Time
      var t = 1397926574790;
      var startt = t;
      var endt = 1400509007520;
      var dt = 4500000;
      var timer = 500;

      // Time Player
      setInterval(function(){
        t = t + dt;
        if(t > endt) {
          t = startt;
        }
        $('#from').html(new Date(t));
        $('#to').html(new Date(t+dt));
      }, timer);

      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          // Every feature is unvisible at start
          layer.setOpacity(0);

          (function(layer, properties) {
            setInterval(function(){
              var tt = properties['time'];
              // Filter by time
              if(tt > t && tt <= (t+dt)) {
                layer.setOpacity(1);
                var svgIcon = L.divIcon({
                  className: 'earthquakes',
                  html: '<svg width="64px" height="64px" viewBox="-20 -20 64 64"><g><circle class="circles" id="' + properties['code'] + '" opacity="0.4" r="1" transform="translate(0,0)"></circle></g></svg>'
                });
                layer.setIcon(svgIcon);
                // Set size by magnitude (you should use setTimeout to animate for sizing)
                setTimeout(function() {
                  d3.select('circle#' + properties['code'])
                    .transition()
                    .delay(0)
                    .duration(4000)
                    .attr('r', properties['mag']*2.5);
                }, 500);
                // Clear feature when finished animation
                setTimeout(function() {
                  layer.setOpacity(0);
                }, 5000);
              }
            }, timer);
          })(layer, feature.properties);
        }
      });
      map.fitBounds(geojson.getBounds());
      geojson.addTo(map);
    });
  }

  function getSize(n) {
    return n > 7 ? 20 :
           n > 6 ? 16 :
           n > 5 ? 12 :
           n > 4 ? 8 :
           8;
  }

  initMap();

});
