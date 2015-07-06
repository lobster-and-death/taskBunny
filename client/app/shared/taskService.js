(function(){

  //load module
  angular.module('trApp')
    .factory('TaskService', ['$http', TaskService]);

  function TaskService($http){
    return {

      addTask: function(form) {
        return $http({
          method: 'POST',
          url: '/api/tasks',
          data: form
        }).success(function(task){
          return task;
        }).error(function(err){
          console.log(err);
        });
      },

      retrieveAllTasks: function(searchQuery) {
      // returns an array of tasks async
        return $http({
          method: 'GET',
          url: '/api/tasks',
        }).success(function(tasks){
          return tasks;
        }).error(function(err){
          console.log(err);
        });
      },

      retrieveUserTasks: function(searchQuery) {
        // returns an array of tasks related to the user
        // each task will have 'isOwner', 'isAssignedToMe', 'appliedTo'
        // boolean properties
        return $http({
          method: 'GET',
          url: '/api/mytasks',
        }).success(function(tasks){
          return tasks;
        }).error(function(err){
          console.log(err);
        });
      },

      retrieveTask: function(taskId) {
        return $http({
          method: 'GET',
          url: '/api/tasks/' + taskId
        }).success(function(tasks){
          return tasks;
        }).error(function(err){
          console.log(err);
        });
      },

      updateTask: function(taskId, information) {
      // changing description of a task
        return $http({
          method: 'POST',
          url: '/api/tasks/' + taskId,
          data: information
        }).success(function(task){
          return task;
        }).error(function(err){
          console.log(err);
        });
      },

      deleteTask: function(taskId) {
      // remove task from db
        return $http({
          method: 'DELETE',
          url: '/api/tasks/' + taskId
        });
      },

      assignTask: function(taskId, userId) {
        return $http({
          method: 'POST',
          url: '/api/task/assign',
          data: {
            task: taskId,
            user: userId
          }
        });
      },

      applyForTask: function(taskId) {
        return $http({
          method: 'POST',
          url: '/api/task/apply',
          data: {
            task: taskId
          }
        });
      },

      setTaskComplete: function(taskId) {
        return $http({
          method: 'GET',
          url: '/api/task/complete/'+taskId
        });
      },
      setTaskReviewed: function(taskId) {
        return $http({
          method: 'GET',
          url: '/api/task/reviewed/'+taskId
        });
      }


    };
  }

})();
