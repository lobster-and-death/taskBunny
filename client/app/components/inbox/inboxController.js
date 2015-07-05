(function(){

//load module
angular.module('trApp')
  .controller('inboxController', ['$scope', '$location', 'inboxService', inboxController]);

  function inboxController($scope, $location, inboxService) {
  	 $scope.form = {};
    // http POST on form submit
    $scope.createMessage = function(){
      console.log($scope.form);
      inboxService.update($scope.form).success(function(){
        $location.path('/tasks');
        $scope.statusMessage = 'Message posted successfully';
      }).catch(function(err){
        console.log(err);
        $scope.errorMessage = "Message posting error";
      });
    }
  }
})();

