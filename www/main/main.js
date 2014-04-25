angular.module('app.main', [])

.controller('MainIndexCtrl', ['$scope', '$filter', 'Users', function($scope, $filter, Users){
  console.log('USERS: ', Users);
  $scope.userDetails = Users.all();

}]);