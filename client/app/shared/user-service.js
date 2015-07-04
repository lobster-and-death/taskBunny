(function(){

  //load module
  angular.module('trApp')
    .factory('UserService', ['$http', UserService]);

  function UserService($http){
    return {

      retrieveUser: function(searchQuery) {
        console.log("user");
        console.log(searchQuery);

        // returns an array of tasks related to the user
        // each task will have 'isOwner', 'isAssignedToMe', 'appliedTo'
        // boolean properties
        return $http({
          method: 'GET',
          url: '/api/users',
        }).success(function(user){
          return user;
        }).error(function(err){
          console.log(err);
        });
      },

    };
  }

})();
