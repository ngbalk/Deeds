
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

deedsAppServices.factory('updatePost', [function(){
	return function(deedId, deedObj) {
		var ref = new Firebase("https://burning-inferno-9477.firebaseio.com/");

		//TODO: Should only update ref/posts and every other instance of the deed refers to the ref/posts instance which will be most up-to-date

  		//Update ref/posts directory
  		ref.child('posts/'+deedId).set(deedObj);

  		//Update ref/communities/communityName/posts directory
  		ref.child('communities/'+deedObj.community+'/posts/'+deedId).set(deedObj);

  		//Update ref/users/posts directory
  		ref.child("users/"+deedObj.user+"/posts/"+deedId).set(deedObj);

  		//Update ref/users/deedsQ directory
  		ref.child("users/"+deedObj.acceptedBy+"/deedsQ/"+deedId).set(deedObj);

	}
}]);

