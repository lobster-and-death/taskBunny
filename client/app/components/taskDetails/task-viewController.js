(function() {

  angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', '$routeParams',
      'TaskService', 'AuthService', TaskViewController
    ]);

  function TaskViewController($scope, $location, $routeParams, TaskService,
    AuthService) {

    // get task _id from $rootParams
    var _id = $routeParams.id;

    $scope.editMode = false;

    $scope.editTask = function() {
      if ($scope.task.isOwner && !$scope.task.assignedTo && $scope.task.applicants
        .length === 0) {
        $scope.editMode = true;
      }
    };

    $scope.cancelEditTask = function() {
      reload();
    };

    // reload task information from server
    var reload = function() {
      TaskService.retrieveTask(_id).success(function(task) {
        $scope.task = task;
        $scope.editMode = false;
        // date is a pesky thing to deal with
        // must always be a Date object for the model per angular's doc
        $scope.deadline = new Date($scope.task.information.deadline);
        $scope.deadlineStr = moment($scope.deadline).format(
          'MMMM Do YYYY');
      });
    };

    $scope.updateTask = function() {
      $scope.editMode = false;
      $scope.task.information.deadline = $scope.deadline;
      TaskService.updateTask(_id, $scope.task.information).success(function() {
        reload();
      }).catch(function(err) {
        //display error message, maybe  $scope.errorMessage = "error" ?
        console.log(err);
      });
    };

    $scope.deleteTask = function() {
      $scope.editMode = false;
      TaskService.deleteTask(_id).success(function() {
        $location.path('/tasks');
      });
      //todo handle error
    };

    $scope.applyForTask = function() {
      TaskService.applyForTask(_id).success(function() {
        reload();
      }).catch(function() {

      });
    };

    $scope.assignToUser = function(userId) {

      TaskService.assignTask(_id, userId).success(function() {
        reload();
      }).catch(function(err) {

      });
    };

    $scope.taskComplete = function(ownr, appl, rev, ownrName, rating) {
      console.log("ownr: ", ownr);
      console.log("appl: ", appl);
      console.log("rev: ", rev);
      console.log("ownrName: ", ownrName);
      console.log("rating: ", rating);
      AuthService.taskPaid(ownr).success(function() {
        console.log('one down');
        AuthService.taskCompleted(appl, rev, ownrName, rating).success(
          function() {
            console.log('two down')
            TaskService.setTaskComplete(_id).success(function() {
              $location.path('/tasks');
            }).success(function() {
              console.log("all down!");
              reload();
            }).catch(function() {
              console.log("wut");
            });
          });
      });


    };

    $scope.viewProfile = function(id) {
      $location.path('/profile/' + id);
    };

    reload(_id);
  };

})();
