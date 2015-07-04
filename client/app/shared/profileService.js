
(function() {

  //load module
  angular.module('trApp')
    .factory('ProfileService', ['$http', ProfileService]);

  function ProfileService($http, ProfileService) {
    return {
      retrieveProfile: function(searchQuery) {
        // returns an array of tasks related to the profile
        // each task will have 'isOwner', 'isAssignedToMe', 'appliedTo'
        // boolean properties
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


// (function() {
  
//   angular.module('trApp')
//     .factory('PaymentService', ['$http', PaymentService]);

//     function PaymentService($http) {
//       var payment = {};

//       payment.check = function() {
//         return $http({
//           method: 'GET',
//           url: '/auth/profile/check'
//         });
//       };

//       payment.update = function(card) {
//         return $http({
//           method: 'POST',
//           url: '/auth/profile/updateCardInfo',
//           data: card
//         });
//       }

//       return payment;
//     }
// })();
