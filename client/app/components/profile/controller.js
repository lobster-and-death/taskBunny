(function() {
  angular.module('trApp')
    .controller('ProfileController', ['$scope', '$location', '$routeParams', 'ProfileService', ProfileController]);

  function ProfileController($scope, $location, $routeParams) {

    // get task _id from $rootParams
    var _id = $routeParams.id;
    console.log(_id);

    // reload task information from server
    var reload = function() {
      console.log("hey file");
      console.log("id", _id);
      ProfileService.retrieveProfile(_id).then(function() {
        console.log();
      });
    };
    reload(_id);
  }
})();
