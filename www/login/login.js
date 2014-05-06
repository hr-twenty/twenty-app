angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope', function($scope){
		$scope.authUrl = 'http://65.52.118.73:55555/auth/linkedin';			
	}]);