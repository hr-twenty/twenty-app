angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', '$state', 'Messages', 'Users', function($scope, $filter, $state, Messages, Users){

	$scope.messages = Messages.storage;

  Messages.getAllMessages(null);

	Messages.updateRegularly($scope, 3000, function() {
		Messages.getAllMessages(null);
	});

  $scope.goToConversation = function(userId) {
    console.log(userId);
    if(typeof userId !== 'string') throw new Error("userId must be a string.");
    $state.go('conversation', {otherId: userId});
  };

}]);