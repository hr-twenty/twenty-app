angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', function($scope){
		$scope.settings = [
			// What does the profile edit page look like?
	  	// {link:'/#/myprofile', title: 'My profile', icon:'ion-person'},
	  	{link:'/#/preferences', title: 'Preferences', icon:'ion-gear-b'},
  		{link:'/#/logout', title: 'Log out', icon:'ion-log-out'},
  		// Remove this login link later
		];
	}]);