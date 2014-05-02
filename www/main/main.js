angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams', 'Users', 'Cards', 'StateControl', function($scope, $location, $stateParams, Users, Cards, StateControl, Backend){

  $scope.$on('$viewContentLoaded', function() {
  	StateControl.toggleMenuByState($stateParams);
  });

  if($location.$$search.userId) {
		Users.setCurrentUserId($location.$$search.userId);
  }

  $scope.user = Users.currentUserId();

  $scope.deckIsEmpty = function() {
  	if(Cards.cardStack.length === 0) {
  		return true;
  	} else {
  		return false;
  	}
  };

}]);