angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', '$filter', function($scope, $filter){
		$scope.settings = [
	  	{link:'#/myprofile', title: 'My profile', icon:'ion-person'},
  		{link:'#/logout', title: 'Log out', icon:'ion-log-out'}
		];
	}]);