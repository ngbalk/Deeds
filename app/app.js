'use strict';

// Declare app level module which depends on views, and components
var deedsApp = angular.module('deedsApp', [
  'ngRoute',
  'deedsAppLoginModule',
  'deedsAppSignUpModule',
  'deedsAppHomeModule',
  'deedsAppFilters',
  'myApp.version',
  'firebase'
]);

deedsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
