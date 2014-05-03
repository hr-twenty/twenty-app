angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope', function($scope){
		$scope.authUrl = 'http://65.52.118.73:55555/auth/linkedin';			
		// $scope.authUrl = 'http://10.4.8.235:8000/auth/linkedin';

	}]);