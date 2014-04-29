angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', '$interval', 'Messages', 'StateControl', function($scope, $filter, $stateParams, $interval, Messages, StateControl) {

	$scope.otherId = $stateParams.otherId;
	$scope.conversation = Messages.dateFilter(Messages.oneConversation($scope.otherId)[0]);
	var intPromise;

	$scope.$on('$viewContentLoaded', function() {
		StateControl.scrollToBottom(false);

		console.log($scope.conversation.lastMessage());

		Messages.updateRegularly($scope, 400, function() {
			var msgParams = {otherId: $scope.otherId, mostRecentMsg: $scope.conversation.lastMessage()};
			Messages.getOneMessage(msgParams, function(foundNew) {
				if(foundNew) {
					StateControl.scrollToBottom(false);	
				}
			});
		});
	});

	$scope.msg = {};
	$scope.goBack = StateControl.goBackWithState('main.home', 'conversations');

	$scope.sendMessage = function() {
		Messages.sendMessage({
			text: $scope.msg.text,
			otherId: $scope.conversation.other.userId
		});
		StateControl.scrollToBottom(true);
		$scope.msg = {};
	};

}]);