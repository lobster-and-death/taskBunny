(function(){

  //load module
  angular.module('trApp')
    .controller('TaskFormController', ['$scope', '$location', 'TaskService', TaskFormController]);

  function TaskFormController($scope, $location, TaskService){
    $scope.form = {};

    // http POST on form submit
    $scope.createTask = function(){
      console.log($scope.form.deadline);
      TaskService.addTask($scope.form).success(function(){
        $location.path('/tasks');
      }).catch(function(err){
        console.log(err);
        $scope.errorMessage = "task creation error";
      });
    };

    $scope.redirectCall = function() {
      $location.path('/tasks');
    };
  };

})();
