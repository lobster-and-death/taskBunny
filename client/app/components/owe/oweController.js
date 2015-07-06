(function() {
angular.module('trApp')
  .controller('oweController', ['$scope', '$location', '$http', 'TaskService', oweController]);

  function oweController($scope, $location, $http, TaskService) {

    TaskService.retrieveUserTasks().success(function(tasks) {
      $scope.tasks = _.filter(tasks, function(task) {
        return task.isOwner && task.complete;
      });
    });

    $scope.pay = function(debtor, owner, cost) {
      console.log('Paying:');
      console.log(debtor);
      console.log('Task owner:');
      console.log(owner);
      console.log('Amount to pay:');
      console.log(cost);

      return $http({
        method: 'POST',
        url: '/charge',
        data: {
          stripeOwner: owner,
          stripeDebtor: debtor,
          amount: cost
        }
      })
      .success(function(data, status) {
        console.log('Success: Payment made');
        $scope.paymentMessage = 'Payment made';

      })
      .error(function(data, status) {
        console.log('Error: Payment cannot be made');
        $scope.paymentMessage = 'Error with payment';

      })

      // need to know owner's stripe info and person to pay's stripe info and pass it in request

    }
  }
})();
