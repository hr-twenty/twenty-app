angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams','$ionicModal', '$state', 'Users', 'Cards', 'StateControl', 'Messages', 'Connections', function($scope, $location, $stateParams, $ionicModal, $state, Users, Cards, StateControl, Messages, Connections){

  console.log('loading MainIndexCtrl');

  $scope.draggable = StateControl.dragControl.mainIndex;
  // to get around the fact that mainIndex's value is a primitive, set a $watch
  $scope.$watch(
    function() { return StateControl.dragControl.mainIndex; },
    function(newVal) { $scope.draggable = newVal; }
  );

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
    $scope.newConnection = Connections.currentConnection;
    $scope.startConversation = function(user) {
      $scope.modal.hide();
      $state.go('conversation', {otherId: user.userId});
    };
    $scope.modal.show();
  });

}]);