$(function () {

  console.log('%c⚛ Map Effects 100: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

  var chart, geojson, map;

  // Leaflet Map Init
  function initMap() {
    map = L.map('map').setView([35.8, 130], 5);

    L.tileLayer('//cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    // Two styles
    var defaultStyle = {
      color: '#2262CC',
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0
    };
    var highlightStyle = {
      color: '#ff6500',
      weight: 4,
      opacity: 0.6,
      fillOpacity: 0.65,
      fillColor: '#ff6500'
    };

    // Filter chart to only show features in current map bounds
    map.on("moveend", function(e) {
      synchChart();
    });

    $.getJSON('../data/japan.geojson', function (data) {
      // Set data for chart
      var chartData = [];
      $.each(data.features, function(i, feature) {
        chartData.push(getChartData(feature));
      });
      // Sort data with values
      chartData.sort(compareValueNumbers);
      initChart(chartData);

      geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          // Set the default style into layer
          layer.setStyle(defaultStyle);

          // Set the highlight style into layer when 'mouseover'
          (function(layer, properties) {
            // Leaflet events
            layer.on('mouseover', function (e) {
              layer.setStyle(highlightStyle);

              // Binding: Map -> Chart
              var activeSegments = [];
              $.each(chart.segments, function(i, seg) {
                if(seg.label === properties['ObjName']) {
                  activeSegments.push(seg);
                }
              });
              chart.showTooltip(activeSegments); // Hack the chart.js! But we are not able to highlight the target segment in chart..
            });
            layer.on('mouseout', function (e) {
              layer.setStyle(defaultStyle);
              chart.showTooltip([]);
            });

            // Chart.js events
            $('canvas').on('mousemove', function (e) {
              layer.setStyle(defaultStyle);

              // Binding: Chart -> Map
              var activePoints = chart.getSegmentsAtEvent(e);
              if(activePoints.length > 0) {
                var targetLabel = activePoints[0].label;
                if(targetLabel === properties['ObjName']) {
                  layer.setStyle(highlightStyle);
                }
              }
            });
            $('canvas').on('click', function (e) {
              layer.setStyle(defaultStyle);
              // Binding: Chart -> Map
              var activePoints = chart.getSegmentsAtEvent(e);
              if(activePoints.length > 0) {
                var targetLabel = activePoints[0].label;
                if(targetLabel === properties['ObjName']) {
                  layer.setStyle(highlightStyle);
                }
              }
            });
            $('canvas').on('mouseout', function (e) {
              layer.setStyle(defaultStyle);
            });
          })(layer, feature.properties);
        }
      });
      geojson.addTo(map);
    });
  }

  function initChart(data) {
    var first = true;
    // create or update chart
    if( chart ) {
      chart.destroy();
      // do not animate the Chart
      first = false;
    }
    // Get context
    var ctx = $("#chart").get(0).getContext("2d");
    // Doughnut Chary
    chart = new Chart(ctx).Doughnut(data, {
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 0,
      percentageInnerCutout: 50,
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: first,
      animateScale: false
    });
  }

  function compareValueNumbers(a, b) {
    return (a.value - b.value) * -1;
  }

  function synchChart() {
    var chartData =[];
    geojson.eachLayer(function(layer) {
      if (map.hasLayer(geojson)) {
        if (map.getBounds().intersects(layer.getBounds())) {
          chartData.push(getChartData(layer.feature));
        }
      }
    });
    // Sort data with values
    chartData.sort(compareValueNumbers);
    initChart(chartData);

  }

  function getChartData(feature) {
    var d = {
      value: feature.properties['POP-DENSITY'],
      label: feature.properties['ObjName'],
      color: '#' + Math.random().toString(16).slice(2, 8), // Get color at random
      highlight: '#fff'
    };
    return d;
  }

  initMap();

});
