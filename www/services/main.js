angular.module('app.services.main', [])

.service('Users', ['Backend', 'LocalStorage', function(Backend, LocalStorage) {

  // Ian:
  // var storage = {currentUserId: 'nwRvFWIcyj'};
  // Rob: 
  var storage = {currentUserId: 'K6W50lx84u'};
  // var storage = {currentUserId: 's8WVQkpSBb'};
  // rando person
  // var storage = {currentUserId: 'bqRLPNAyFC'};
  // random ryan face
  // var storage = {currentUserId: 'nwRvFWIcyj'};
  

  this.getUserInfoFromStorage = function() {
    storage.userData = LocalStorage.getUserData();
  };

  this.getUserInfo = function(userId, callback) {
    Backend.get('/user', {userId: userId}, function(data) {
      callback(data);
    });
  };

  this.setCurrentUserInfo = function(callback) {
    Backend.get('/user', {userId: storage.currentUserId}, function(data) {
      console.log('Server responded with user data', data);
      storage.userData = data[0];
      LocalStorage.setUserData(data[0]);
      callback();
    });
  };

  this.deleteAccount = function() {
    Backend.del('/user', {userId: currentUserId}, function(data, status) {
      console.log('Deleted user. Return data: ' + data);
    });
  };

  this.setCurrentUserId = function(userId) {
    storage.currentUserId = userId;
    console.log('new user id is: ' + storage.currentUserId);
  };

  this.currentUserId = function() {
    return storage.currentUserId;
  };

  this.currentUserData = function() {
    return storage.userData;
  };

}])

.service('StateControl', ['$state', '$ionicSideMenuDelegate', '$ionicScrollDelegate', function($state, $ionicSideMenuDelegate,$ionicScrollDelegate) {

  this.toggleMenuByState = function(stateParams, menuReferences) {
    // menuReferences should be an array with [leftSideMenuRef, rightSideMenuRef]
    if(stateParams.menuState) {
      // open the appropriate menu
      if(stateParams.menuState === 'conversations') {
        $ionicSideMenuDelegate.toggleRight();
        
      } else if (stateParams.menuState === 'settings') {
        $ionicSideMenuDelegate.toggleLeft();
      }
    } else {
      if($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();  
      }
      if($ionicSideMenuDelegate.isOpenRight()) {
        $ionicSideMenuDelegate.toggleRight(); 
      }
    }
  };

  this.goBackWithState = function(stateName, menuState) {
    return function() {
      console.log("Going back to " + stateName);
      $state.go(stateName, {'menuState' : menuState});
    };
  };

  this.scrollToBottom = function(shouldScroll) {
    var shouldScroll = shouldScroll || false;
    $ionicScrollDelegate.scrollBottom(shouldScroll);
  };

}])

.filter('dateString', ['$filter', function($filter) {
  return function(input) {
    return $filter('date')(new Date(parseInt(input)), "MMM d, y 'at' h:mm a");
  }
}])

.filter('lastSeen', function() {
  return function(input) {
    // input is going to be a unix string, so make it a date obj
    var then = parseInt(input);
    if(!then) return '';
    var minutesAgo = Math.floor((new Date().getTime() - then) / 60000);

    if(minutesAgo < 1) {
      return '1m';
    } else if(minutesAgo < 60) {
      return Math.floor(minutesAgo) + 'm';
    } else if(1440 > minutesAgo && minutesAgo > 60) {
      return Math.floor(minutesAgo/60) + 'h';
    } else if (10080 > minutesAgo && minutesAgo >= 1440) {
      return Math.floor(minutesAgo/1440) + 'd';
    } else {
      return Math.floor(minutesAgo/10080) + 'w';
    }
  };
})
.filter('reverse', function(){
  return function(items) {
    return items.slice().reverse();
  };
})
;