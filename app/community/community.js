'use strict';

/* Module */

var deedsAppCommunityModule = angular.module('deedsAppCommunityModule', []);


deedsAppCommunityModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/community/:myCommunityId', {
    templateUrl: 'community/community.html',
    controller: 'CommunityCtrl'
  });
}]);



/* Controller */

deedsAppCommunityModule.controller('CommunityCtrl', ['$scope', 'authWallRedirect', '$routeParams', '$location', function($scope, authWallRedirect, $routeParams, $location){

	//Verify user is logged in
	if(!authWallRedirect()){
		return;
	}

	//Declare variables
	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();
  	
	ref.child("communities/"+$routeParams.myCommunityId).on("value", function(snapshot) {
		$scope.communityObj=snapshot.val();

		//Update the DOM
    	if(!$scope.$$phase) {
        	$scope.$apply();
    	}
	});

	$scope.joinCommunity=function(){
		//Add community to User's community list.
		ref.child("users/"+authData.uid+"/communities/"+$routeParams.myCommunityId).set({"member":true, "name":$scope.communityObj.name});

		//Update Community's member list
		ref.child("communities/"+$routeParams.myCommunityId+"/members/"+authData.uid).set(true);
	}

}]);