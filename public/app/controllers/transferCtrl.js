angular.module('transferCtrl', [])

.controller('sendMoneyCtrl', function($http, Account) {
  var vm = this;

  Account.accountDetails()
    .success(function(data) {
      vm.user = data;
    });

  vm.send = function() {
    var req = {
      method: 'GET',
      url: 'http://localhost:5000/send',
      params: {
        from: vm.user.email,
        to: vm.send.email,
        amount: vm.send.amount
      }
    }

    $http(req)
      .then(function(res) {
        console.log(res.data);
        vm.message = res.data;
        vm.send.email = '';
        vm.send.amount = '';
      })
  }

});
