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
  $scope.communitySelection=null;

  $scope.userCommunities=["Home", "School", "AEPi"];

  //Redirect to login page if not already logged in
  if(!authData){
    $location.path('/login');
  }

  //Create reference to user's posts
  var userRef=ref.child("users").child(authData.uid);
  var userPostsRef=userRef.child("posts");

  //Create reference to community's posts
  var userCommunitiesRef=userRef.child("communities");

  //Realtime query user's posts
  userPostsRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    $scope.userPosts=snapshot.val();
  }, 
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  //Realtime query user's communities
  userCommunitiesRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    $scope.userCommunities=snapshot.val();
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

    var newPostObj = {
      message: $scope.newPost,
      deeds: 0,
      community: $scope.communitySelection,
      user: authData.uid,
      clout: 0,
      timestamp: Date.now()
    };
    userPostsRef.push(newPostObj);
    console.log("Succesfully submitted post: "+newPostObj);
  }

}]);