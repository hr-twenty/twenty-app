angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$state', '$filter', '$stateParams', 'Messages', function($scope, $state, $filter, $stateParams, Messages) {

	console.log($scope.$viewHistory);

	$scope.cId = $stateParams.conversationId;

	$scope.goToMessages = function() {
		$state.go('main.home');
	}

	$scope.conversations = Messages.all();
}]);