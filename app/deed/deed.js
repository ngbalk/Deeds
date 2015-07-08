'use strict';

var deedsAppDeedModule = angular.module('deedsAppDeedModule', []);

deedsAppDeedModule.controller('DeedCtrl', ['$scope', 'authWallRedirect', '$routeParams', function($scope, authWallRedirect, $routeParams){

	if(!authWallRedirect()){
		return;
	}

	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();

  	//Query post
  	ref.child('posts/'+$routeParams.deedId).on("value", function(snapshot) {
	    	$scope.deedObj=snapshot.val();
	    	console.log($scope.deedObj);
	  	}, 
	    function (errorObject) {
	      	console.log("The read failed: " + errorObject.code);
	    }
  	);
  	//Why isnt this updating????

  	//Update the DOM
	if(!$scope.$$phase) {
		$scope.$apply();
	}
	
}]);