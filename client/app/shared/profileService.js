(function() {

  //load module
  angular.module('trApp')
    .factory('ProfileService', ['$http', ProfileService]);

  function ProfileService($http) {
    return {
      retrieveProfile: function(searchQuery) {
        console.log('query');
        console.log(searchQuery);
        // returns an array of tasks related to the profile
        // each task will have 'isOwner', 'isAssignedToMe', 'appliedTo'
        // boolean properties
        return $http({
          method: 'GET',
          url: '/profile/' + searchQuery,
        }).success(function(profile) {
          return profile;
        }).error(function(err) {
          console.log(err);
        });
      }
    };
  }
})();