angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope','$state', 'Users', 'Cards', 
    function($scope, $state, Users, Cards) {
		$scope.authUrl = 'http://191.236.102.40:55555/auth/linkedin';

    var initialize = function(){
      Users.getUserInfoFromStorage();
      Cards.getCardsFromStorage();
    }();

    $scope.authorize = function() {
      //if user doesn't exist on local storage, run auth flow
      if(!Users.currentUserId()){
        var ref = window.open($scope.authUrl, '_blank', 'location=no');
        ref.addEventListener('loadstart', function(e) {
          var userId = /userId=(.+)/.exec(e.url);
          if (userId) {
            console.log('userID after login', userId);
            Users.setCurrentUserId(userId[1]);
            ref.close();
            $state.go('loading');
          }
        });
      //if there are no cards on local storage, go to loading screen
      } else if(!Cards.hasCardsOnStack()){
        $state.go('loading');
      //if localstorage has user and cards, go to main
      } else {
        $state.go('main.home');
      }
    };
	}]);