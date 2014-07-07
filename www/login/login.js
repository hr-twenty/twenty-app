angular.module('app.login', [])

	.controller('LoginCtrl', ['$scope','$state', 'Users', 'Cards', 'Connections', 
    function($scope, $state, Users, Cards, Connections) {
		$scope.authUrl = 'twenty-prod.cloudapp.net:55555/auth/linkedin';

    var initialize = function(){
      
      console.log('Running initialize');
      Users.getUserInfoFromStorage();
      Cards.getCardsFromStorage();
      setTimeout(function(){
        if(checkConnection()){
          $ionicPopup.alert({title: 'You currently have limited or no internet connectivity, which may impact the performance of this app'});
        }
      },500);
    }();

    $scope.authorize = function() {
      console.log('running $scope.authorize');
      //if no connection, alert user that they cannot progress
      if(checkConnection()){
        $ionicPopup.alert({title: 'We are unable to process your request without a data connection'});
      //if user doesn't exist on local storage, run auth flow
      } else if(!Users.currentUserId()){
        console.log('no current user id; opening the deal');
        var ref = window.open($scope.authUrl, '_blank', 'location=no');
        ref.addEventListener('loadstart', function(e) {
          var userId = /userId=(.+)/.exec(e.url);
          if (userId) {
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
        Connections.logPotentialConnections(Cards.cardStack);
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

      if(states[networkState] === 'No network connection'){return true;}
      else {return false;}
    };

}]);
