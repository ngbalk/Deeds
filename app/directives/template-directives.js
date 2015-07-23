'use strict';

/* Module */
var deedsAppTemplateDirectives = angular.module('deedsAppTemplateDirectives', []);


/* Directives */

deedsAppTemplateDirectives.directive('myCreateCommunityModal', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/create-community-modal.html'
	};
});

deedsAppTemplateDirectives.directive('myFeedItem', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
	      	myFeedTitle: '@myFeedTitle',
	      	myFeedDeeds: '@myFeedDeeds',
	      	myFeedId: '@myFeedId'
    	},
		templateUrl: 'templates/feed-item.html',
		controller: function($scope, $location){
			$scope.clickFeedItem = function(){
				var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  				var authData = ref.getAuth();
  				ref.child('posts/'+$scope.myFeedId).on("value", function(snapshot){
  					if(snapshot.val().user==authData.uid){
  						console.log(snapshot.val().user + " : " + authData.uid);
  						$location.path("/my-deed/"+$scope.myFeedId);
  					}
  					else{
  						console.log("this is not my post");
  						$location.path("/deed/"+$scope.myFeedId);
  					}
  					//Update the DOM
					if(!$scope.$$phase) {
						$scope.$apply();
					}	
  				})
			}
		}
	};
});

deedsAppTemplateDirectives.directive('myCreatePostModal', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/create-post-modal.html'
	};
});


deedsAppTemplateDirectives.directive('myEditPostModal', function(){
	return {
		restrict: 'E',
		scope: {
	      	myDeedId: '@myDeedId'
    	},
		templateUrl: 'templates/edit-post-modal.html',
		controller: function($scope){
			var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
			$scope.deedObj = {};

			ref.child('posts/'+$scope.myDeedId).on("value", function(snapshot){
  				$scope.deedObj=snapshot.val();
  			});

  			$scope.updateDeed=function(event){

	  			//Update posts/myDeedId
				ref.child('posts/'+$scope.myDeedId).set($scope.deedObj);

				//Update users/userId/posts/myDeedId
				ref.child('users/'+ref.getAuth().uid+'/posts/'+$scope.myDeedId).set($scope.deedObj);

				//Update communities/community/posts/myDeedId
				ref.child('communities/'+$scope.deedObj.community+'/posts/'+$scope.myDeedId).set($scope.deedObj);
  			}
			
		}
	};
});

deedsAppTemplateDirectives.directive('mySearchCommunityModal', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/search-community-modal.html',
		controller: function($scope){
			var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");

			var $scope.communityList = {};

			ref.child('communities').on('value', function(snapshot){
				$scope.communityList=snapshot.val();
			});

			//TODO: build out this function with real values
			$scope.joinCommunity=function(event){
				ref.child("users/"+ref.getAuth().uid+"/communities/"+"SELECTED-COMMUNITY.name").set("SELECTED-COMMUNITY");

			}
		}
	}
});


