angular.module('app.main.ownprofile' , [])

.controller('OwnProfileCtrl', ['$scope', '$stateParams', 'Users', 'StateControl', function($scope, $stateParams, Users, StateControl) {
	$scope.userDetails = Users.currentUserData();
	console.log($scope.userDetails);	

	$scope.goBack = StateControl.goBackWithState('main.home', 'settings');
}]);