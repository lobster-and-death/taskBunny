(function(){
  //load module
  angular.module('trApp')
    .factory('inboxService', ['$http', inboxService]);

  function inboxService($http){
      var inbox = {};

      inbox.check = function(form) {
       return $http({
          method: 'GET',
          url: '/inboxes'
        });
      };

      inbox.update = function(card) {
        return $http({
          method: 'POST',
          url: '/inboxes',
          data: form
        }).success(function(message){
          return message;
        }).error(function(err){
          console.log(err);
        });
      }
      
      return inbox; 
      }
    };
  }
})();