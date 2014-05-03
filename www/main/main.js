angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams','$ionicModal', 'Users', 'Cards', 'StateControl', 'Messages', function($scope, $location, $stateParams, $ionicModal, Users, Cards, StateControl, Messages){

  console.log('loading MainIndexCtrl');

  $scope.$on('$viewContentLoaded', function() {
    if($stateParams) {
    	StateControl.toggleMenuByState($stateParams);
    }
  });

  $scope.user = Users.currentUserId();

  $ionicModal.fromTemplateUrl('../templates/new-connect.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  Messages.on('newConnect', function() {
    $scope.newConnection = Cards.storage.newConnection;
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