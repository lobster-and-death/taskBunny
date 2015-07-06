(function() {
angular.module('trApp')
  .controller('oweController', ['$scope', '$location', 'TaskService', oweController]);

  function oweController($scope, $location, TaskService) {

    TaskService.retrieveUserTasks().success(function(tasks) {
      $scope.tasks = _.filter(tasks, function(task) {
        return task.isOwner && task.complete;
      });
    });

    $scope.pay = function(person) {
      console.log('Paying:');
      console.log(person);

    }
  }
})();
