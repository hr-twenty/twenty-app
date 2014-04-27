angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){
	// TODO: Enable this when web services are hooked up
	// $scope.conversations = Messages.getAllMessages(Users.currentUserId);
	$scope.conversations = Messages.all();
}]);