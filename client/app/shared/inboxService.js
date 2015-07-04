(function(){
  //load module
  angular.module('trApp')
    .factory('inboxService', ['$http', inboxService]);

  function inboxService($http){
      var inbox = {};

      inbox.check = function() {
        return $http({
          method: 'GET',
          url: '/auth/profile/check'
        });
      };

      inbox.update = function(card) {
        return $http({
          method: 'POST',
          url: '/auth/profile/updateCardInfo',
          data: card
        });
      }
      return inbox; 
      }
    };
  }
})();