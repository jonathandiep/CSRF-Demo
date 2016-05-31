angular.module('routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
      /*
      controller: 'homeController',
      controllerAs: 'home'
      */
    })
    .when('/login', {
      templateUrl: 'app/views/pages/login.html'
    })
    .when('/signup', {
      templateUrl: 'app/views/pages/signup.html',
      controller: 'createAccountCtrl',
      controllerAs: 'account'
    })
    .when('/dashboard', {
      templateUrl: 'app/views/pages/dashboard.html'
    })

  $locationProvider.html5Mode(true);
}]);
