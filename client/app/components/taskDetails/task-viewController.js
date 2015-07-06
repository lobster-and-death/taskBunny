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
        console.log(task.isAssignedToMe);
        $scope.task = task;
        $scope.editMode = false;
        // date is a pesky thing to deal with
        // must always be a Date object for the model per angular's doc
        console.log($scope.task.information.deadline);
        $scope.deadline = new Date($scope.task.information.deadline);
        $scope.deadlineStr = $scope.task.information.deadline === null ? "flexible" : moment($scope.deadline).format(
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
      AuthService.taskPaid(ownr).success(function() {
        AuthService.taskCompleted(appl, rev, ownrName, rating).success(
          function() {
            TaskService.setTaskComplete(_id).success(function() {
              $location.path('/tasks');
            }).success(function() {
              reload();
            }).catch(function() {
              console.log("wut");
            });
          });
      });
    };
    // (task.owner._id, task.assignedTo.name, task.ownrReview, task.information.ownerStar)
    $scope.taskReview = function(ownr, appl, rev, rating) {
      AuthService.taskReview(ownr, appl, rev, rating)
        .success(function() {
          TaskService.setTaskReviewed(_id).success(function() {
            $location.path('/tasks');
          });
        })
        .success(function() {
          console.log("review in!");
          reload();
        }).catch(function() {
          console.log("wut");
        });
    };

    $scope.viewProfile = function(id) {
      $location.path('/profile/' + id);
    };

    reload(_id);
  };

})();
