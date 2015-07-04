(function(){

//load module
angular.module('trApp')
  .controller('inboxController', ['$scope', '$location', inboxController]);

  function inboxController($scope, $location, inboxController) {
  	 $scope.form = {};
    // http POST on form submit
    $scope.createTask = function(){
      TaskService.addTask($scope.form).success(function(){
        $location.path('/tasks');
      }).catch(function(err){
        console.log(err);
        $scope.errorMessage = "task creation error";
      });
    };
  }

})();

