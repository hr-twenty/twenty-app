angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', function($scope, $filter, Messages){
	$scope.conversations = Messages.all();
}]);