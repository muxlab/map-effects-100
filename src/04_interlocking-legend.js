$(function() {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  var d3Quantize, classNum = 7;

  // Leaflet Map Init
  function initMap() {
    var map = L.map('map').setView([35.8, 139], 8);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    // D3 Quantize to classfy into 7 range!
    d3Quantize = d3.scale.quantize().domain([0, 7000]).range(d3.range(classNum));
    console.log(d3Quantize.invertExtent(0));

    var legend = L.control({
      position: 'bottomleft'
    });
    legend.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'legend'),
        labels = [],
        from, to;
      for (var i = 0; i < classNum; i++) {
        from = Math.round(d3Quantize.invertExtent(i)[0]);
        to = Math.round(d3Quantize.invertExtent(i)[1]);
        labels.push(
          '<i style="background:' + getColor(from) + '"></i><span class=class' + i + '> ' +
          from + (to ? '&nbsp;&ndash;&nbsp;' + to + '</span>' : '+'));
      }
      div.innerHTML = labels.join('<br>');
      return div;
    };

    legend.addTo(map);

    // Two styles
    var defaultStyle = {
      color: '#2262CC',
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0
    };

    $.getJSON('../data/japan.geojson', function(data) {
      var geojson = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
          // Set the default style into layer
          layer.setStyle(defaultStyle);

          // Set the highlight style into layer when 'mouseover'
          (function(layer, properties) {
            layer.on('mouseover', function(e) {
              // Set Label Style with class
              setLabelBold(d3Quantize(feature.properties['POP-DENSITY']));
              // Set the style with classified color
              layer.setStyle(getClassifiedStyle(feature.properties['POP-DENSITY']));
            });
            layer.on('mouseout', function(e) {
              removeLabelBold();
              layer.setStyle(defaultStyle);
            });
          })(layer, feature.properties);
        }
      });
      geojson.addTo(map);
    });
  }

  function getClassifiedStyle(num) {
    var color = getColor(num);
    var style = {
      color: color,
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: color
    };
    return style;
  }

  function setLabelBold(i) {
    $('span.class' + i).css({
      fontWeight: 'bold',
      color: '#6600ff'
    });
  }

  function removeLabelBold() {
    for (var i = 0; i < classNum; i++) {
      $('span.class' + i).css({
        fontWeight: 'normal',
        color: '#000'
      });
    }
  }

  function getColor(d) {
    return d > d3Quantize.invertExtent(6)[0] ? '#800026' :
      d > d3Quantize.invertExtent(5)[0] ? '#BD0026' :
      d > d3Quantize.invertExtent(4)[0] ? '#E31A1C' :
      d > d3Quantize.invertExtent(3)[0] ? '#FC4E2A' :
      d > d3Quantize.invertExtent(2)[0] ? '#FD8D3C' :
      d > d3Quantize.invertExtent(1)[0] ? '#FEB24C' :
      d > d3Quantize.invertExtent(0)[0] ? '#FED976' :
      '#FFEDA0';
  }


  initMap();

});
