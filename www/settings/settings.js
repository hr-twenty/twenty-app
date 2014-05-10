angular.module('app.settings', [])

	.controller('SettingsCtrl', ['$scope', '$state', 'Users', function($scope, $state, Users){

    $scope.goToSetting = function(settingName) {
      if(settingName === 'login') {
        Users.destroySavedUserData();
      }
      $state.go(settingName);
    };

		$scope.settings = [
	  	{link:'ownDetails', title: 'My profile', icon:'ion-person'},
	  	{link:'preferences', title: 'Preferences', icon:'ion-gear-b'},
  		{link:'login', title: 'Log out', icon:'ion-log-out'}
		];
	}]);