angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', 'Users', function($scope, Users){
  $scope.userDetails = Users.all();
}]);