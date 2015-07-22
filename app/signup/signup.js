'use strict';

/* Module */

var deedsAppSignUpModule = angular.module('deedsAppSignUpModule', ['ngRoute']);

/* Module Config */

 
/* Controller */

deedsAppSignUpModule.controller('SignUpCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.name="Create Account";
	$scope.snippet = "Create a new account!"
	$scope.username = "";
  	$scope.password = "";
  	$scope.valid = $scope.password.length>=8;
  $scope.signUp = function(event){
    event.preventDefault();
    var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
    ref.createUser({
      email    : $scope.username,
      password : $scope.password
      }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {

      //Initialize deedBalance
      ref.child('users/'+userData.uid+'/data/deedsBalance').set(10);

      //Rediret to login page
      $location.path('/login');

      //Update DOM
      $scope.$apply();	
      console.log("Successfully created user account with uid:", userData.uid);
    }
    });


  }
}]);