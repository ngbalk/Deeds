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
	      	myFeedItemName: '@myFeedItemName',
	      	myFeedItemDeeds: '@myFeedItemDeeds',
	      	myFeedItemId: '@myFeedItemId'
    	},
		templateUrl: 'templates/feed-item.html',
		controller: function($scope, $location){
			$scope.clickFeedItem = function(){
				var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  				var authData = ref.getAuth();
  				console.log($scope.myFeedItemId);
  				ref.child('posts/'+$scope.myFeedItemId).on("value", function(snapshot){
  					if(snapshot.val().user==authData.uid){
  						console.log(snapshot.val().user + " : " + authData.uid);
  						$location.path("/my-deed/"+$scope.myFeedItemId);
  					}
  					else{
  						console.log("this is not my post");
  						$location.path("/deed/"+$scope.myFeedItemId);
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
				ref.child('communities/'+$scope.deedObj.communityId+'/posts/'+$scope.myDeedId).set($scope.deedObj);
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

			$scope.communityList = {};

			ref.child('communities').on('value', function(snapshot){
				$scope.communityList=snapshot.val();
				console.log($scope.communityList);

				//Update the DOM
				if(!$scope.$$phase) {
					$scope.$apply();
				}	
			});
			console.log($scope.communityList);
		}
	}
});

deedsAppTemplateDirectives.directive('myCommunityItem', function(){
	return {
		restrict: 'E',
		scope: {
			myCommunityId: "@myCommunityId",
			myCommunityName: "@myCommunityName",
			myCommunityHost: "@myCommunityHost"
		},
		templateUrl: 'templates/community-item.html',
		controller: function($scope, $location){
			var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
			$scope.clickCommunityItem=function(event){

				//Remove Modal
				$('#search-community-modal').modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();

				//Navigate to community landing page
				$location.path("/community/"+$scope.myCommunityId);
			}
		}
	}
});
