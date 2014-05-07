angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', '$state', function($scope, $state){

    $scope.goToSetting = function(settingName) {
      $state.go(settingName);
    };

		$scope.settings = [
	  	{link:'ownDetails', title: 'My profile', icon:'ion-person'},
	  	{link:'preferences', title: 'Preferences', icon:'ion-gear-b'},
  		{link:'login', title: 'Log out', icon:'ion-log-out'}
		];
	}]);