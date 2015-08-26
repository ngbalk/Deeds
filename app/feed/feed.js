'use strict';

/* Module */

var deedsAppFeedModule = angular.module('deedsAppFeedModule', ['ngRoute']);

deedsAppFeedModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/feed', {
  	templateUrl: 'feed/feed.html',
  	controller: 'FeedCtrl'
  })
  .when('/deed/:deedId', {
    templateUrl: 'deed/deed.html',
    controller: 'DeedCtrl'
  })
  .when('/my-deed/:deedId', {
    templateUrl: 'deed/my-deed.html',
    controller: 'DeedCtrl'
  })
  .when('/deed-removal-splash', {
    templateUrl: 'deed/deed-removal-splash.html',
  });
}]);

/* Controller */
deedsAppFeedModule.controller('FeedCtrl', ['$scope', '$location', 'authWallRedirect', function($scope, $location, authWallRedirect){

	if(!authWallRedirect()){
		return;
	}

	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();

	//Scope variables
	$scope.communities=[];
	$scope.posts=[];

	//Query Firebase for all of the user's resident communities.
	ref.child("users/"+authData.uid+"/communities").on("value", function(snapshot){
		$scope.communities=snapshot.val();
	});

	//Query Firebase for all posts relevant to this user (i.e. all post within resident communities).
	//TODO: This function is really bad because it queries all communities and rebuilds the posts array each time.
	ref.child("communities").on("value", function(snapshot){
		$scope.posts={};
		snapshot.forEach(function(communitySnapshot){
			if(communitySnapshot.child("members/"+authData.uid).exists()){
				communitySnapshot.child("posts").forEach(function(postSnapshot){
					if(postSnapshot.val().accepted==false){
	            		$scope.posts[postSnapshot.key()]=postSnapshot.val();
	            	}
				});					
			}
		});
		//Update the DOM
		if(!$scope.$$phase) {
			$scope.$apply();
		}	
	});
}]);

