angular.module('app.services.users', [])

.service('Users', ['Backend', 'LocalStorage', function(Backend, LocalStorage) {

  var storage = {};

  // storage.userId = 'nwRvFWIcyj';
  // Rob's user id
  // storage.userId = 'K6W50lx84u';

  this.addUserMethods = function(userArr) {
    var truncateString = function(str, maxLen) {
      if (str.length > maxLen) {
        str = str.substring(0, maxLen);
        var res = str.split(' ');
        res.pop();
        return res.join(' ') + '...';
      } else {
        return str;
      }
    };
    var methods = {
      displayUserName: function() {
        var firstName = this.firstName;
        var lastName = this.lastName;
        return firstName + ' ' + lastName[0].toUpperCase() + '.';
      },
      connectionsTotal: function () {
        return +this.numConnections < 500 ? this.numConnections : '500+';
      },
      displayUserHeadline: function() {
        return truncateString(this.headline, 64);
      },
      displayWorksFor: function() {
        if (this.WORKS_FOR) {
          return truncateString(this.WORKS_FOR[0].name, 22);
        } 
        return ' ';
      }
    };
    angular.forEach(userArr, function(user, i) {
      userArr[i] = _.extend(user, methods);
    });
    return userArr;
  };

  this.destroySavedUserData = function() {
    storage.userData = {};
    storage.userId = '';
    LocalStorage.removeUserData();
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

}]);