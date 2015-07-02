
/* Module */
var deedsAppServices = angular.module('deedsAppServices', []);
  
/* Services */
deedsAppServices.factory('authWallRedirect', ['$location', function($location) {
    return function() {
	    var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");
  		if(!ref.getAuth()){
    		$location.path('/login');
    		return false;
  		}
  		console.log('User ' + ref.getAuth().uid + ' logged in');
  		return true;
    }
}]);