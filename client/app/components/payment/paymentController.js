(function(){

//load module
angular.module('trApp')
  .controller('paymentController', ['$scope', 'PaymentService', paymentController]);

  function paymentController($scope, PaymentService) {
    $scope.card = {};
    // $scope.user = {};

    PaymentService.check();
    // .then(function(response) {
    //   $scope.user = response.data;
    // })

    $scope.save = function() {
      console.log($scope.card);
      PaymentService.update($scope.card).then(function() {
        $scope.statusMessage = 'Card info updated successfully';
      }).catch(function() {
        $scope.statusMessage = 'Error updating card info!';
      });
    }
  }

})();

