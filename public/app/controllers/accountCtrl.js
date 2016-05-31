angular.module('accountCtrl', ['accountService'])

  .controller('createAccountCtrl', function($location, Account, userDataService) {
    var vm = this;

    vm.createAccount = function() {
      Account.signup(vm.userData)
        .success(function(data) {
          console.log(data);
          userDataService.changeAccount(data);
          $location.url('/dashboard');
        });
    }
  });
