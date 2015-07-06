(function() {
  angular.module('trApp')
    .controller('ProfileController', ['$scope', '$location', '$routeParams',
      'ProfileService', ProfileController
    ]);

  function ProfileController($scope, $location, $routeParams, ProfileService) {

    // get task _id from $rootParams
    var _id = $routeParams.id;
    $scope.user = {};
    console.log(_id);

    // reload task information from server
    $scope.reload = function() {
      console.log("id", _id);
      ProfileService.retrieveProfile(_id).success(function(data) {
        console.log("success");
        console.log(data);
        $scope.user = data;
        console.log("rating");
        console.log($scope.user.rating);
        if ($scope.user.ratingCount === 0) {
          $scope.rating = "no ratings yet";
        } else {
          $scope.rating = $scope.user.ratingTotal / $scope.user.ratingCount;
        }
      }).catch(function(err) {
        console.log(err);
      });
    };
    $scope.goBack = function() {
      window.history.back();
    };

    $scope.reload(_id);

  }
})();
