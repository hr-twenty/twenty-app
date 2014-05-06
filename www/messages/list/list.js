angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){

	$scope.messages = Messages.storage;

  Messages.getAllMessages(null, function(data) {
    console.log("Fetching new messages from within list.js...");
    console.log($scope.messages);
  });

	Messages.updateRegularly($scope, 3000, function() {
		Messages.getAllMessages(null, function(data) {
			console.log("Fetching new messages from within list.js...");
			console.log($scope.messages);
		});
	});

}]);