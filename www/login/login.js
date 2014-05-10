angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope','$state', '$ionicPopup', 'Users', 'Cards', 
    function($scope, $state, $ionicPopup, Users, Cards) {
		$scope.authUrl = 'http://191.236.102.40:55555/auth/linkedin';

    var initialize = function(){
      Users.getUserInfoFromStorage();
      Cards.getCardsFromStorage();
    }();

    $scope.authorize = function() {
      checkConnection();

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

    var checkConnection = function(){
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      if(states[networkState] === 'No network connection'){
        $ionicPopup.alert({
          title: 'You currently have limited or no internet connectivity, which may impact the performance of this app'
        });
      }
    };

}]);