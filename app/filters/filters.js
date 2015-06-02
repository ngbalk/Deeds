
/* Module */

var deedsAppFilters = angular.module('deedsAppFilters', []);

/* Filters */ 

deedsAppFilters.filter('passwordValidation', function() {
  return function(input) {
    if(input.length>=8){
    	return '\u2705';
    }
  };
});


