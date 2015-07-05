(function(){
  //load module
  angular.module('trApp')
    .factory('inboxService', ['$http', inboxService]);

  function inboxService($http){
      var inbox = {};

      inbox.check = function() {
       return $http({
          method: 'GET',
          url: '/inboxes'
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