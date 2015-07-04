(function(){

  //load module
angular.module('trApp')
  .controller('TaskMapController', ['$scope', '$location']);

angular.module('trApp').directive('mapbox', [
  function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        callback: "="
      },
      template: '<div id="map"></div>',
      link: function (scope, element, attributes) {
        L.mapbox.accessToken = "pk.eyJ1Ijoicm9ubmllYnJvd24iLCJhIjoiZjE0NDRmMmJiZTYyNzZlY2Y2OGNhNGM5NDg3Yjc5ZjkifQ.oWwrU2zjDqgvikSLJODqvg";
        // var map = L.mapbox.map(element[0], 'ronniebrown.mk1nidh4');
        var map = L.mapbox.map('map', null);

        var layers = {
          "cray": L.mapbox.tileLayer('ronniebrown.mk1nidh4'),
          "concrete jungle": L.mapbox.tileLayer('ronniebrown.mk213a65')
        };

        layers["cray"].addTo(map);
        L.control.layers(layers).addTo(map);

        L.control.scale({imperial: true}).addTo(map);
        scope.callback(map);
      }
    };
  }
]);

angular.module('trApp').controller('TaskMapController', [
  '$scope',
  function ($scope) {
    $scope.callback = function (map) {
      map.setView([37.719, -122.435], 11);
    };
  }
]);

// function showMarkers() {
// var icons = {
//   bunnyIcon : L.icon({
//     iconUrl: "assets/img/bunny.png",
//     iconSize: [30, 15],
//     className: "icon"
//   })
// };

// var layer = L.geoJson(markers, {
//   pointToLayer: function(feature, latLng) {
//     return L.marker(latLng, {
//       title: feature.properties.title,
//       icon: icons[feature.properties.description]
//     });
//   },
//   onEachFeature: function(feature, layer) {
//     Layer.bindPopup(feature.properties.title);

//     Layer.on("click", function(event) {
//       sidebar = getElementById("sidebar");

//     })
//   }
// });

// layer.addTo(map);
// };

// setUpMap();
// showMarkers();

})();
