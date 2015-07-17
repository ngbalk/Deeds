'use strict';

/* Module */

var deedsAppDeedModule = angular.module('deedsAppDeedModule', []);


/* Controller */

deedsAppDeedModule.controller('DeedCtrl', ['$scope', 'authWallRedirect', '$routeParams', function($scope, authWallRedirect, $routeParams){

	//Verify user is logged in
	if(!authWallRedirect()){
		return;
	}

	//Declare variables
	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();
  	$scope.deedObj;

  	//Query post
  	ref.child('posts/'+$routeParams.deedId).on("value", function(snapshot) {
	    	$scope.deedObj=snapshot.val();

	    	//Update the DOM
	    	if(!$scope.$$phase) {
				$scope.$apply();
			}
	  	}, 
	    function (errorObject) {
	      	console.log("The read failed: " + errorObject.code);
	    }
  	);

  	//Accept deed clickable method
  	$scope.acceptDeed=function(event){

  		//Update $scope.deedObj to 'accepted'
  		$scope.deedObj.accepted=true;
  		$scope.deedObj.acceptedBy=authData.uid;

  		//Update ref/posts directory
  		ref.child('posts/'+$routeParams.deedId).set($scope.deedObj);

  		//Update ref/communities/communityName/posts directory
  		ref.child('communities/'+$scope.deedObj.community+'/posts/'+$routeParams.deedId).set($scope.deedObj);

  		//Update ref/uid/deedsQ directory
  		ref.child("users/"+authData.uid+"/deedsQ/"+$routeParams.deedId).set($scope.deedObj);

  		console.log("Succesfully accepted deed "+ $routeParams.deedId);



  	}

  	//Update the DOM
  	if(!$scope.$$phase) {
		$scope.$apply();
	}
	
}]);