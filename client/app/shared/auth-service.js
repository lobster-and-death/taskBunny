
(function(){

  angular.module('trApp')
    .factory('AuthService', ['$http', AuthService]);

  function AuthService($http){

    var profile = {};

    profile.check = function(){
      return $http({
        method: 'GET',
        url: '/auth/profile/check'
      });
    };

    profile.update = function(user){
      return $http({
        method: 'POST',
        url: '/auth/profile/update',
        data: user
      });
    };

    profile.taskPaid = function(id) {
        console.log("paying task");
        console.log(id);
        return $http({
          method: 'POST',
          url: '/api/profile/paid/' + id
        }).success(function() {
          console.log("successfully paid incremented");
        }).error(function(err) {
          console.log(err);
        });
      };

      profile.taskCompleted = function(id, rev, ownr) {
        console.log("task paid");
        console.log(rev);
        console.log(ownr);
        var review = {
          review: rev,
          reviewer: ownr
        }
        return $http({
          method: 'POST',
          url: '/api/profile/completed/' + id,
          data: review
        }).success(function() {
          console.log("successfully completed incremented");
        }).error(function(err) {
          console.log(err);
        });
      };


    return profile;
  }

})();
