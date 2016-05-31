angular.module('accountService', [])

  .factory('Account', function($http) {
    var accountFactory = {};

    accountFactory.signup = function(userData) {
      return $http.post('/signup', userData);
    };

    return accountFactory;
  })

  .service('userDataService', function() {
    var account = {};

    var changeAccount = function(data) {
      account = data;
    };

    var getAccount = function() {
      return account;
    };

    return {
      changeAccount: changeAccount,
      getAccount: getAccount
    };
  });
