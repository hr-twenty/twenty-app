angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', function($scope){
		$scope.settings = [
	  	{link:'#/myprofile', title: 'My profile', icon:'ion-person'},
	  	{link:'#/settings', title: 'Settings', icon:'ion-gear-b'},
  		{link:'#/logout', title: 'Log out', icon:'ion-log-out'},
  		// Remove this login link later
		];
	}]);