'use strict';

/* Module */

var deedsAppFeedModule = angular.module('deedsAppFeedModule', ['ngRoute']);

deedsAppFeedModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
  	templateUrl: 'feed/feed.html',
  	controller: 'FeedCtrl'
  });
}]);

deedsAppFeedModule.controller('FeedCtrl', ['$scope', '$location', function($scope, $location){
	var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  	var authData = ref.getAuth();

}]);

