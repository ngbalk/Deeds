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
		controller: function($scope){
			$scope.clickFeedItem = function(){
				console.log($scope.myFeedId);
				//Navigate to a page with more info on this deed
			}
		}
	};
});

deedsAppTemplateDirectives.directive('myCreatePostModal', function(){
	return {
		templateUrl: 'templates/create-post-modal.html'
	};
});


