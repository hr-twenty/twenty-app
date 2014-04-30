angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$stateParams', 'Users', 'StateControl', 'Backend', function($scope, $stateParams, Users, StateControl, Backend){

  $scope.$on('$viewContentLoaded', function() {
  	StateControl.toggleMenuByState($stateParams);
  });

  Backend.get('/user', {userId: '10'}, function(data) {
  	console.log(data);
  });

}]);