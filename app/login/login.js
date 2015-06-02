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
  });
}]);
 
 /* Controller */

deedsAppLoginModule.controller('LoginCtrl', ['$scope', function($scope) {
	$scope.name="Login";
	$scope.snippet="Please sign in using you Deeds username and password";
	$scope.username = "";
	$scope.password = "";
	$scope.valid = false;
}]);