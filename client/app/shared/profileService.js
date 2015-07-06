
(function() {

  //load module
  angular.module('trApp')
    .factory('ProfileService', ['$http', ProfileService]);

  function ProfileService($http, ProfileService) {
    return {
      retrieveProfile: function(searchQuery) {        
        return $http({
          method: 'GET',
          url: 'auth/profile/' + searchQuery,
        }).success(function(profile) {
          return profile;
        }).error(function(err) {
          console.log(err);
        });
      }
    };
  }
})();