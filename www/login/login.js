angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope','$state', 'Users', function($scope, $state, Users) {
		$scope.authUrl = 'http://65.52.118.73:55555/auth/linkedin';

    $scope.authorize = function() {
      var ref = window.open($scope.authUrl, '_blank');
      ref.addEventListener('loadstart', function(e) {
        var userId = /userId=(.+)/.exec(e.url)[1];

        if (userId) {
          Users.setCurrentUserId(userId);
          ref.close();
          $state.go('loading');
        }
      });
    };

    $scope.goToLoading = function() {
      $state.go('main.home');
    }
	}]);