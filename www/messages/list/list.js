angular.module('app.messages.list', [])

.controller('MessagesListCtrl', ['$scope', '$filter', 'Messages', 'Users', function($scope, $filter, Messages, Users){

	// What's the best way to do this with $scope.$watch?
	// $scope.conversations = Messages.conversations;

	// $scope.$watch(
	// 	function() { 
	// 		console.log('Watching...');
	// 		return Messages.conversations;
	// 	},
	// 	function(value) {
	// 		console.log('Returning...');
	// 		$scope.conversations = value;
	// 	});

	if(Messages.conversations) {
		$scope.conversations = Messages.conversations;
	} else {
		console.log('getAllMessages');
		Messages.getAllMessages(null, function(data) {
			$scope.conversations = data;
		});
	}
}]);