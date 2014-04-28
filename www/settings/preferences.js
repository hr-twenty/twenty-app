angular.module('app.settings.preferences', [])

	.controller('PreferencesCtrl', ['$scope', 'StateControl','Users', function($scope, StateControl, Users){
		$scope.goBack = StateControl.goBackWithState('main.home', 'settings');

		$scope.preferences = [
			// search for users isn't MVP, i don't think
	  	// {link: '#', title: 'Search for users within:', icon: 'ion-search', selectorType:'slider', value: 10},
	  	{link:'/#/delete', title: 'Delete account', icon:'ion-close-circled', selectorType: 'link'}
		];
	}]);