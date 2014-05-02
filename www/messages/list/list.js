angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){

	$scope.messages = Messages.storage;
	console.log('$scope.messages in list.js:', $scope.messages);
	// retrieve messages immediately
	Messages.getAllMessages(null);

	Messages.updateRegularly($scope, 10000, function() {
		Messages.getAllMessages(null, function(data) {
			// console.log("Fetching new messages from within list.js...");
			// console.log($scope.messages);
		});
	});

}]);