(function(){

//load module
angular.module('trApp')
  .controller('inboxController', ['$scope', '$location', 'inboxService', inboxController]);

  function inboxController($scope, $location, inboxService) {
  	 $scope.form = {};
     $scope.messagesData = {};
     $scope.count = {};
    
    $scope.reload = function() {
      inboxService.checkMessages().success(function(messages){
          console.log("controller messages", messages);
          $scope.messagesData = messages;
          $scope.count = messages.length;
          console.log($scope.messagesData);
          return messages;
        });
    }
    $scope.reload();
    // console.log("testing form Data", $scope.data);


  //    $scope.reload = function() {
  //     console.log("id", _id);
  //     ProfileService.retrieveProfile(_id).success(function(data) {        
  //       console.log("success");
  //       console.log(data);
  //       $scope.user = data;
  //     }).catch(function(err) {
  //       console.log(err);
  //     });
  //   };
  //   $scope.reload(_id);
  // }
 

    // $scope.createdMessages = _.filter(messages, function(message){
    //     return message;
    //   });

    // TaskService.retrieveUserTasks().success(function(tasks){
    //   tasks = _.map(tasks, function(task){
    //     task.information.deadline = moment(Date(task.information.deadline)).format('MMMM Do YYYY');
    //     return task;
    //   });

    //   $scope.createdTasks = _.filter(tasks, function(task){
    //     return task.isOwner;
    //   });


    // http POST on form submit
    $scope.createMessage = function(){
      console.log($scope.form);
      inboxService.update($scope.form).success(function(){
        $location.path('/tasks');
        console.log('Message posted successfully');
      }).catch(function(err){
        console.log(err);
        console.log("Message posting error");
      });
    }
  }
})();

