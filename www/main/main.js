angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$location','$stateParams', 'Users', 'StateControl', function($scope, $location, $stateParams, Users, StateControl, Backend){

  $scope.$on('$viewContentLoaded', function() {
  	StateControl.toggleMenuByState($stateParams);
  });

  if($location.$$search.userId) {
		Users.currentUserId = $location.$$search.userId;
  }

}]);