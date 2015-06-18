'use strict';

/* Module */

var deedsAppLoginModule = angular.module('deedsAppLoginModule', ['ngRoute']);


/* Module Config */

deedsAppLoginModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
  	templateUrl: 'signup/signup.html',
  	controller: 'SignUpCtrl'
  })
  .when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);
 
 /* Controller */

deedsAppLoginModule.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
  var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
	$scope.name="Login";
	$scope.snippet="Please sign in using you Deeds username and password";
  $scope.username = "";
  $scope.password = "";

  $scope.login = function(event){
    ref.authWithPassword({
    email    : $scope.username,
    password : $scope.password
    }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      $location.path('/home');
      $scope.$apply();

      console.log("Authenticated successfully with payload:", authData);
    }
    });

  }

}]);



