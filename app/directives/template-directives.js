'use strict';

/* Module */
var jpmcAppTemplateDirectives = angular.module('jpmcAppTemplateDirectives', []);

/* Directives */
jpmcAppTemplateDirectives.directive('myCreateComponentModal', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/create-component-modal.html'
	};
});
