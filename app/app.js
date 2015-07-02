'use strict';

/* Bootstrapping app's modules */

var deedsApp = angular.module('deedsApp', [
  'ngRoute',
  'deedsAppLoginModule',
  'deedsAppSignUpModule',
  'deedsAppHomeModule',
  'deedsAppFilters',
  'myApp.version',
  'firebase',
  'deedsAppTemplateDirectives',
  'deedsAppFeedModule',
  'deedsAppServices'
]);

deedsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
