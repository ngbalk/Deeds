'use strict';

/* Module */
var deedsAppTemplateDirectives = angular.module('deedsAppTemplateDirectives', []);


/* Directives */

deedsAppTemplateDirectives.directive('myCreateCommunityModal', function() {
	return {
		templateUrl: 'templates/create-community-modal.html'
	};
});

deedsAppTemplateDirectives.directive('myFeedItem', function() {
	return {
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
		templateUrl: 'templates/create-post-modal.html'
	};
});


