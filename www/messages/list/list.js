angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', function($scope, $filter, Messages){
	$scope.userMessages = Messages.all();
}]);