angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){

	$scope.messages = Messages.storage;

	// retrieve messages immediately
	Messages.getAllMessages(null);

	Messages.updateRegularly($scope, 10000, function() {
		Messages.getAllMessages(null, function(data) {
			// getting all messages...
		});
	});

}]);