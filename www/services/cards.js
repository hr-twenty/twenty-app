angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', 'LocalStorage', 'Connections', function($filter, $http, Users, Backend, LocalStorage, Connections) {

  this.cardStack = [];
  this.loaded = false;
  this.CardsInScope = [];

  this.getAllCards = function(callback) {
    var self = this;
    var params = {
      userId: Users.currentUserId()
    };

    Backend.get('/userStack', params, function(data, status) {
      console.log('Card data from server:', data);
      var res = [];
      angular.forEach(data, function(item, i) {
        res.push(item.userId);
      })
      console.log(JSON.stringify(res));
      self.cardStack = data;
      callback(data);   
    });
  }

  this.getCardsFromStorage = function(){
    this.cardStack = LocalStorage.getCardsFromStorage();
  };

  this.hasCardsOnScope = function(){
    return LocalStorage.hasScopeCards();
  };

  // ISSUE: getAllCards resets the whole stack, while reloadStack should add to it (the callback adds cards twice)
  this.reloadStack = function() {
    var self = this;
    console.log('Reloading Stack (Cards Service)');
    var params = {
      userId: Users.currentUserId()
    };

    Backend.get('/userStack', params, function(data, status) {
      data = Users.addUserMethods(data);
      Connections.logPotentialConnections(data);
      data.forEach(function(card) { self.cardStack.push(card); });
      LocalStorage.writeCardsToLocal(self.cardStack);
    });
  }

  this.acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId + ''
    };

    Backend.post('/userStack/approve', params, function(data) {
      Connections.checkNewConnections(userId);
      console.log('User Accept Post Success');
    });
  }

  this.rejectUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId
    };

    Backend.post('/userStack/reject', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

  this.reset = function() {
    console.log('calling: reset');
    var params = {
      userId: Users.currentUserId()
    }

    Backend.post('/userStack/reset', params, function(data) {
      console.log('User Reset Post Success');
    });
  }

// this.reset();

}]);







