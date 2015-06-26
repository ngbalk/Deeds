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
 
 /* Main Controller */

deedsAppHomeModule.controller('HomeCtrl', ['$scope', '$location', function($scope, $location) {
  
  //Variables
  var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  var authData = ref.getAuth();
  $scope.newPost="New Post";
  $scope.communitySelection;

  //Redirect to login page if not already logged in
  if(!authData){
    $location.path('/login');
  }

  //Create root user ref
  var userRef=ref.child("users").child(authData.uid);
  
  //Create reference to user's posts
  var userPostsRef=userRef.child("posts");

  //Create reference to user's communities
  var userCommunitiesRef=userRef.child("communities");

  //Create reference to communities' posts
  var communitiesRef=ref.child("communities");

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

  /* Submit New Post 
  *
  *  Store new post as a child of user's posts
  *  Store new post as a child of selected community's posts
  */
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
    communitiesRef.child($scope.communitySelection).push(newPostObj);
    console.log("Succesfully submitted post: "+newPostObj);
  }

}]);

/* Create Community Controller */

deedsAppHomeModule.controller('CreateCommunityCtrl', ['$scope', '$location', function($scope, $location) {
  var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  var authData = ref.getAuth();
  var userRef=ref.child("users").child(authData.uid);
  var communitiesRef=ref.child("communities");
  var userCommunitiesRef=userRef.child("communities");
  $scope.newCommunityName;
  $scope.submitNewCommunity = function($event){
    var newCommunityObj = {
      name: $scope.newCommunityName,
      createdBy: authData.uid,
      timestamp: Date.now()
    }
    communitiesRef.push(newCommunityObj);
    userCommunitiesRef.push(newCommunityObj);
    console.log("Succesfully created new community: "+newCommunityObj);
  }

}]);