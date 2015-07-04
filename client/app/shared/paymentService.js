(function() {
  
  angular.module('trApp')
    .factory('PaymentService', ['$http', PaymentService]);

    function PaymentService($http) {
      var payment = {};

      payment.check = function() {
        return $http({
          method: 'GET',
          url: '/auth/profile/check'
        });
      };

      payment.update = function(card) {
        return $http({
          method: 'POST',
          url: '/auth/profile/updateCardInfo',
          data: card
        });
      }

      return payment;
    }
})();
