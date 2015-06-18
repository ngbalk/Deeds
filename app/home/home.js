'use strict';

/* Module */

var deedsAppHomeModule = angular.module('deedsAppHomeModule', ['ngRoute']);


/* Module Config */

deedsAppHomeModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);
 
 /* Controller */

deedsAppHomeModule.controller('HomeCtrl', ['$scope', '$location', function($scope, $location) {
  var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  var authData = ref.getAuth();
  if(!authData){
    $location.path('/login');
  }
  
  $scope.post="New Post";
  //Retrieve JSON formatted posts for specific user from Firebase
  $scope.logout=function(event){
    ref.unauth();
    $location.path('/login');
    console.log("Succesfully Logged Out User: "+authData.uid);
  }

}]);