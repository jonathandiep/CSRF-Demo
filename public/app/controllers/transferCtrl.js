angular.module('transferCtrl', [])

  .controller('sendMoneyCtrl', function($http, Account) {
    var vm = this;

    Account.accountDetails()
      .success(function(data) {
        vm.user = data;
        console.log(vm.user);
      });

    $http.get('http://localhost:5000/csrfToken')
      .then(function(res) {
        vm.csrfToken = res.data.csrfToken;
        console.log('CSRF Token: ' + res.data.csrfToken);
      });

    vm.send = function() {
      var req = {
        method: 'POST',
        url: 'http://localhost:5000/send',
        params: {
          from: vm.user.email,
          to: vm.send.email,
          amount: vm.send.amount,
          _csrf: vm.csrfToken
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
