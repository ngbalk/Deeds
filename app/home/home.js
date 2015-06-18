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
  
  //Variables
  var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  var authData = ref.getAuth();
  $scope.newPost="New Post";

  //Redirect to login if not logged in
  if(!authData){
    $location.path('/login');
  }

  //Create reference to user's posts
  var usersRef=ref.child("users");
  var userPostsRef=usersRef.child(authData.uid);


  //Realtime query user's posts
  userPostsRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    $scope.userPosts=snapshot.val();
  }, 
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  //Logout Function
  $scope.logout=function(event){
    ref.unauth();
    $location.path('/login');
    console.log("Succesfully Logged Out User: "+authData.uid);
  }

  //Submit Function
  $scope.submitPost=function(event){

    userPostsRef.push($scope.newPost);
    console.log("Succesfully submitted post: "+$scope.newPost);
  }

}]);