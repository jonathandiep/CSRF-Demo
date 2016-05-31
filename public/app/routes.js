angular.module('routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
    })
    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'loginCtrl',
      controllerAs: 'login'
    })
    .when('/signup', {
      templateUrl: 'app/views/pages/signup.html',
      controller: 'createAccountCtrl',
      controllerAs: 'account'
    })
    .when('/dashboard', {
      templateUrl: 'app/views/pages/dashboard.html'
    })
    .when('/thanks', {
      templateUrl: 'app/views/pages/thanks.html'
    })

  $locationProvider.html5Mode(true);
}]);
