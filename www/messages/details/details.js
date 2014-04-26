angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', 'Messages', 'StateControl', function($scope, $filter, $stateParams, Messages, StateControl) {

	$scope.goBack = StateControl.goBackWithState('main.home', 'conversations');

	$scope.cId = $stateParams.conversationId;
	$scope.conversations = Messages.all();
}]);