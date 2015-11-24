'use strict';

var jpmcAppIndexModule = angular.module('jpmcAppIndexModule', ['ngRoute']);

jpmcAppIndexModule.controller('IndexCtrl', ['$scope', function($scope) {
	var components={}

	$scope.componentName="";
	$scope.groupId="";
	$scope.artifactId="";
	$scope.version="";


	$scope.addComponent = function(){
		components[$scope.componentName]={
					"dependencies":
						{
							"groupId":$scope.groupId,
							"artifactId":$scope.artifactId,
							"version":$scope.version
						}};

		//$scope.newComponentAsJson=$scope.componentName+': {"dependencies": [{"groupId": \"'+$scope.groupId+'\","artifactId": \"'+$scope.artifactId+'\","version": \"'+$scope.version+'\"}]}';
		$scope.componentsAsString=JSON.stringify(components,null,2);
		$.ajax({
	        type: "POST",
	        url: 'http://localhost:3001/post',
	        contentType: "application/json",
	        data: JSON.stringify(components),
	        success: function(resp){
	        	console.log(resp);
	        }
    })
	}

}]);