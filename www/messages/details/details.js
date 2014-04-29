angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', '$interval', 'Messages', 'StateControl', function($scope, $filter, $stateParams, $interval, Messages, StateControl) {

	$scope.otherId = $stateParams.otherId;
	$scope.conversation = Messages.dateFilter(Messages.oneConversation($scope.otherId)[0]);
	var intPromise;

	$scope.$on('$viewContentLoaded', function() {
		StateControl.scrollToBottom(false);

		intPromise = $interval(function() {

			var lastMsgTime = Messages.lastMessageTime($scope.conversation);

			Messages.getOneMessage({otherId: $scope.otherId, mostRecentMsg: lastMsgTime}, function(data) {
				data = Messages.dateFilter(data[0]);
				_.forEach(data.messages, function(element, index) {
					$scope.conversation.messages.push(element);
					StateControl.scrollToBottom(true);
				});
			});
		}, 400);
	});

	$scope.$on('$destroy', function() {
		$interval.cancel(intPromise);
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