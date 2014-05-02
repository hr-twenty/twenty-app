angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams','$ionicModal', 'Users', 'Cards', 'StateControl', 'Messages', function($scope, $location, $stateParams, $ionicModal, Users, Cards, StateControl, Messages){
  
  $scope.$on('$viewContentLoaded', function() {
    StateControl.toggleMenuByState($stateParams);
  });

  $scope.user = Users.currentUserId();

  $ionicModal.fromTemplateUrl('../templates/new-connect.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  Messages.on('newConnect', function() {
    $scope.modal.show();
  });

  $scope.deckIsEmpty = function() {
  	if(Cards.cardStack.length === 0) {
  		return true;
  	} else {
  		return false;
  	}
  };

}]);