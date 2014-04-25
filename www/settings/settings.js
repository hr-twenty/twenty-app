angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', function($scope){
		$scope.settings = [
	  	{link:'#/myprofile', title: 'My profile', icon:'ion-person'},
  		{link:'#/logout', title: 'Log out', icon:'ion-log-out'}
		];
	}]);