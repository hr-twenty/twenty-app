angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', '$interval', 'Messages', 'StateControl', function($scope, $filter, $stateParams, $interval, Messages, StateControl) {

	$scope.otherId = $stateParams.otherId;
	$scope.conversation = Messages.oneConversation($scope.otherId);
	$scope.goBack = StateControl.goBackWithState('main.home', 'conversations');
	$scope.msg = {};

	$scope.$on('$viewContentLoaded', function() {
		StateControl.scrollToBottom(false);

		Messages.updateRegularly($scope, 1000, function() {
			var msgParams = {otherId: $scope.otherId, mostRecentMsg: $scope.conversation.lastMessage()};
			Messages.getOneMessage(msgParams, function(foundNew) {
				if(foundNew) {
					StateControl.scrollToBottom(false);	
				}
			});
		});
	});

	$scope.sendMessage = function() {
		Messages.sendMessage({
			text: $scope.msg.text,
			otherId: $scope.conversation.other.userId
		});
		StateControl.scrollToBottom(true);
		$scope.msg = {};
	};

}]);