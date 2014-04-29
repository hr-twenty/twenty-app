angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$stateParams', 'Users', 'StateControl', function($scope, $stateParams, Users, StateControl){

  $scope.$on('$viewContentLoaded', function() {
  	StateControl.toggleMenuByState($stateParams);
  });
}]);