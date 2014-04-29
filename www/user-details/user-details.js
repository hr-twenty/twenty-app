angular.module('app.main.details' , [])

.controller('MainDetailsCtrl', ['$scope', '$filter', '$stateParams', 'Messages', 'StateControl', function($scope, $filter, $stateParams, Messages, StateControl) {
	
	$scope.otherUserId = $stateParams.otherUserId;
	
	
}]);