'use strict';

/* Module */

var deedsAppDeedModule = angular.module('deedsAppDeedModule', []);


/* Controller */

deedsAppDeedModule.controller('DeedCtrl', ['$scope', 'authWallRedirect', '$routeParams', '$location', function($scope, authWallRedirect, $routeParams, $location){

	//Verify user is logged in
	if(!authWallRedirect()){
		return;
	}

	//Declare variables
	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();
  	$scope.deedObj;
  	$scope.deedId=$routeParams.deedId;

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
  		ref.child('communities/'+$scope.deedObj.communityId+'/posts/'+$routeParams.deedId).set($scope.deedObj);

  		//Update ref/users/uid/deedsQ directory
  		ref.child("users/"+authData.uid+"/deedsQ/"+$routeParams.deedId).set($scope.deedObj);
  	}

  	$scope.deleteDeed=function(event){

  		//Remove deed from ref/communities/communityName/posts directory
  		ref.child('communities/'+$scope.deedObj.communityId+'/posts/'+$routeParams.deedId).remove();

  		// //Remove deed from ref/users/uid/deedsQ directory
  		// ref.child("users/"+authData.uid+"/deedsQ/"+$routeParams.deedId).remove();

  		//Remove deed from ref/users/uid/deedsQ directory
  		ref.child("users/"+authData.uid+"/posts/"+$routeParams.deedId).remove();

  		//Remove deed from ref/posts directory
  		ref.child('posts/'+$routeParams.deedId).remove();

  		$location.path('/deed-removal-splash');
  		return;

  	}

  	$scope.deedCompleted=function(event){

  		if($scope.deedObj.completed==false){

	  		//Update deedObj.completed status to true
	  		$scope.deedObj.completed=true;

	  		//Update ref/posts directory
	  		ref.child('posts/'+$routeParams.deedId).set($scope.deedObj);

	  		//Update ref/communities/communityName/posts directory
	  		ref.child('communities/'+$scope.deedObj.communityId+'/posts/'+$routeParams.deedId).set($scope.deedObj);

	  		//Update ref/users/posts directory
	  		ref.child("users/"+authData.uid+"/posts/"+$routeParams.deedId).set($scope.deedObj);

	  		//Award deeds to completing user
	  		var currentDeedsBalance=0;
	  		ref.child("users/"+$scope.deedObj.acceptedBy+"/data/deedsBalance").on("value", function(snapshot){
	  			var currentDeedsBalance=snapshot.val();
	  		});

			//Update the DOM
		  	if(!$scope.$$phase) {
				$scope.$apply();
			}
	  		ref.child("users/"+$scope.deedObj.acceptedBy+"/data/deedsBalance").set(currentDeedsBalance + $scope.deedObj.deeds);

  		}

  	}

  	//Update the DOM
  	if(!$scope.$$phase) {
		$scope.$apply();
	}
	
}]);