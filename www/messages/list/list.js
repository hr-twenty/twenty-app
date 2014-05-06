angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){

	$scope.messages = Messages.storage;

  Messages.getAllMessages(null, function(data) {
  });

	Messages.updateRegularly($scope, 3000, function() {
		Messages.getAllMessages(null, function(data) {
		});
	});

}]);