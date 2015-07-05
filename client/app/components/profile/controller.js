(function() {
  angular.module('trApp')
    .controller('ProfileController', ['$scope', '$location', '$routeParams', 'ProfileService', ProfileController]);

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
        if ($scope.user.rating[0] === 0) {
          $scope.rating = "no reviews yet";
        } else {
          $scope.rating = $scope.user.rating[1] / $scope.user.rating[0];
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




// (function() {

//   //load module
//   angular.module('trApp')
//     .controller('inboxController', ['$scope', '$location', inboxController]);

//   function inboxController($scope, $location, inboxController) {
//     $scope.form = {};
//     // http POST on form submit
//     $scope.createTask = function() {
//       TaskService.addTask($scope.form).success(function() {
//         $location.path('/tasks');
//       }).catch(function(err) {
//         console.log(err);
//         $scope.errorMessage = "task creation error";
//       });
//     };
//   }

// })();
