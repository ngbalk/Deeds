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
	      	myFeedTitle: '@myFeedTitle'
    	},
		templateUrl: 'templates/feed-item.html'
	};
});