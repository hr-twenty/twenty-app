angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', 'Messages', 'StateControl', function($scope, $filter, $stateParams, Messages, StateControl) {
	
	$scope.$on('$viewContentLoaded', function() {
		StateControl.scrollToBottom(false);
	});

	$scope.msg = {};
	$scope.goBack = StateControl.goBackWithState('main.home', 'conversations');
	$scope.cId = $stateParams.conversationId;
	$scope.conversations = Messages.all();

	$scope.sendMessage = function() {
		console.log($scope);
		Messages.sendMessage({
			text: $scope.msg.text,
			recipient: $scope.conversations[$scope.cId].contactId
		});
		StateControl.scrollToBottom(true);
		$scope.msg = {};
	};
}]);