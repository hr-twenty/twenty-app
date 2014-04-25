angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', 'Messages', function($scope, $filter, $stateParams, Messages) {

	$scope.cId = $stateParams.conversationId;
	console.log($scope.cId);

	$scope.conversations = Messages.all();
}]);