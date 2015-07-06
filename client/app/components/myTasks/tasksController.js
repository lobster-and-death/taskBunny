(function(){

angular.module('trApp')
    .controller('TasksController', ['$scope', '$location', 'TaskService', TasksController]);

  function TasksController($scope, $location, TaskService){
    // make calls to TaskFormService to retrieve all tasks

    TaskService.retrieveUserTasks().success(function(tasks){
      tasks = _.map(tasks, function(task){
        console.log("deadline before");
        console.log(task.information.deadline);
        // task.information.deadline = moment(Date(task.information.deadline)).format('MMMM Do YYYY');        
        task.information.deadline = moment(task.information.deadline).format('MMMM Do YYYY');
        if (task.information.deadline === "Invalid date") task.information.deadline = "flexible";
        console.log("deadline after");
        console.log(task.information.deadline);
        return task;
      });

      $scope.createdTasks = _.filter(tasks, function(task){
        return task.isOwner;
      });

      $scope.appliedTasks = _.filter(tasks, function(task){
        return (task.appliedTo && !task.isAssignedToMe);
      });

      $scope.assignedTasks = _.filter(tasks, function(task){
        return task.isAssignedToMe;
      });

    });

    $scope.viewTask = function(id) {
      $location.path('/task/' + id);
    }

  };

})();
