angular.module('app.services.main', [])

.service('Users', ['Backend', 'LocalStorage', function(Backend, LocalStorage) {

  var storage = {};

  this.addUserMethods = function(userArr) {
    var methods = {
      displayUserName: function() {
        var firstName = this.firstName;
        var lastName = this.lastName;
        return firstName + ' ' + lastName[0].toUpperCase() + '.';
      },
      connectionsTotal: function () {
        return +this.numConnections < 500 ? this.numConnections : '500+';
      }
    };
    angular.forEach(userArr, function(user, i) {
      userArr[i] = _.extend(user, methods);
    });
    return userArr;
  };
  
  this.getUserInfoFromStorage = function() {
    storage.userData = LocalStorage.getUserData();
    if(storage.userData){
      storage.userId = storage.userData.userId;
    }
  };

  this.getUserInfo = function(userId, callback) {
    Backend.get('/user', {userId: userId}, function(data) {
      callback(data);
    });
  };

  this.setCurrentUserInfo = function(callback) {
    Backend.get('/user', {userId: storage.userId}, function(data) {
      console.log('Server responded with user data', data);
      storage.userData = data[0];
      LocalStorage.setUserData(data[0]);
      callback();
    });
  };

  this.deleteAccount = function() {
    var params = {userId: storage.userId};
    console.log(params);
    Backend.del('/user', params, function(data, status) {
      console.log('Deleted user. Return data: ' + data);
    });
  };

  this.setCurrentUserId = function(userId) {
    storage.userId = userId;
    console.log('new user id is: ' + storage.userId);
  };

  this.currentUserId = function() {
    return storage.userId;
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

  this.conversationWithState = function(scope) {
    return function(userId) {
      console.log('Going to a conversation with ' + userId);
      scope.modal.hide();
      $state.go('conversation.otherId', {'otherId': userId });
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

.filter('lastMessageSent', function() {
  return function(conversations) {
    if(conversations && Array.isArray(conversations) && conversations.length > 0) {
      conversations = conversations.sort(function(a,b) {
        return a.lastMessage() > b.lastMessage() ? -1 : 1;
      });
    } 
    return conversations;
  };
})
;