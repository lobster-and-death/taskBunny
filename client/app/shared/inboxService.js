(function(){
  //load module
  angular.module('trApp')
    .factory('inboxService', ['$http', inboxService]);

  function inboxService($http){
      var inbox = {};

      inbox.checkMessages = function(search) {
       return $http({
          method: 'GET',
          url: '/inboxes'
        }).success(function(messages){
          return messages;
        }).error(function(err){
          console.log(err);
        });
      };

      inbox.update = function(formData) {
        return $http({
          method: 'POST',
          url: '/inboxes',
          data: formData
        });
      }
    return inbox; 
  }
})();