angular.module('app.settings.delete', [])

	.controller('DeleteCtrl', ['$ionicPopup', 'Users', 'StateControl', function($ionicPopup, Users, StateControl) {

		var goToLogin = StateControl.goBackWithState('login', false);
		var goToPrefs = StateControl.goBackWithState('preferences', false);
		
		var deleteAccount = function() {
			$ionicPopup.confirm({
				title:'Delete account',
				content: 'Are you sure you want to delete your account?'
			}).then(function(res) {
				if(res) {
					console.log('Delete the account.');
					Users.deleteAccount();
					$ionicPopup.alert({
						title: 'Success',
						content: 'Your account was deleted successfully.'
					}).then(function(res) {
						goToLogin();
					})
				} else {
					console.log('Didn\'t want to delete the account.');
					goToPrefs();
				}
			})
		}();

	}]);