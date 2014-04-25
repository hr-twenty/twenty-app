angular.module('app.main', [
	
])

.controller('MainIndexCtrl', ['$scope', '$filter', function($scope, $filter, Users){
  console.log('USERS: ', Users);
  $scope.userDetails = Users.query();

	// Users.query().then(function(userDetails) {
 //    console.log('User Details:', userDetails);
	// 	$scope.userDetails = userDetails;
	// });

}]);