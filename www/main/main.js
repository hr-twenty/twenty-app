angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams','$ionicModal', '$state', 'Users', 'Cards', 'StateControl', 'Messages', 'Connections', function($scope, $location, $stateParams, $ionicModal, $state, Users, Cards, StateControl, Messages, Connections){

  console.log('loading MainIndexCtrl');

  $scope.$on('$viewContentLoaded', function() {
    if($stateParams) {
    	StateControl.toggleMenuByState($stateParams);
    }
  });

  $scope.user = Users.currentUserId();
  $scope.userData = Users.currentUserData();

  $ionicModal.fromTemplateUrl('templates/new-connect.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  Connections.on('newConnect', function() {
    console.log('logging from inside the newConnect callback');
    $scope.newConnection = Connections.currentConnection;
    $scope.startConversation = function(user) {
      $scope.modal.hide();
      $state.go('conversation', {otherId: user.userId});
    };
    $scope.modal.show();
  });

}]);