'use strict';

/* Module */

var deedsAppSignUpModule = angular.module('deedsAppSignUpModule', ['ngRoute']);

/* Module Config */

 
/* Controller */

deedsAppSignUpModule.controller('SignUpCtrl', ['$scope', function($scope) {
	$scope.snippet = "Please sign up for a new account!"
	$scope.password = "";
}]);