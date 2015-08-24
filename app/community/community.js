'use strict';

/* Module */

var deedsAppCommunityModule = angular.module('deedsAppCommunityModule', []);


deedsAppCommunityModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/community/:myCommunityName', {
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
  	
	$scope.myCommunityName=$routeParams.myCommunityName;

}]);