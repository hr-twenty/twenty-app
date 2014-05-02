angular.module('app.main.ownprofile' , [])

.controller('OwnProfileCtrl', ['$scope', '$stateParams', 'Users', 'StateControl', function($scope, $stateParams, Users, StateControl) {
	$scope.userDetails = Users.currentUserData();
	console.log($scope.userDetails);	

	// TODO: Remove this when the profile information is being populated fully from LinkedIn OAuth
	// $scope.userDetails.HAS_SKILL = ['AngularJS', 'Kittens', 'Hugs', 'Beer', 'JavaScript', 'Venture Capital', 'Programming'];
	$scope.userDetails.lastActive = '5';
	// $scope.userDetails.WORKS_FOR.name = 'Hack Reactor';
	$scope.userDetails.sharedContacts = '1';
	$scope.goBack = StateControl.goBackWithState('main.home', 'settings');
}]);