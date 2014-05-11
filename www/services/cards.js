angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', 'LocalStorage', 'Connections', function($filter, $http, Users, Backend, LocalStorage, Connections) {

  this.cardStack = [];
  this.loaded = false;
  this.CardsInScope = [];

  this.getAllCards = function(callback) {
    var self = this;
    var params = {
      userId: Users.currentUserId(),
      excludeId: self.currentCardIds()
    };

    console.log('getAllCards', params);
    Backend.get('/userStack', params, function(data, status) {
      self.cardStack = Users.addUserMethods(data);
      callback(data);   
    });
  }

  this.getCardsFromStorage = function(){
    console.log('getting cards from storage');
    this.cardStack = Users.addUserMethods(LocalStorage.getCardsFromStorage());
    console.log('Cards.cardStack looks like: ', this.cardStack);
  };

  this.hasCardsOnStack = function(){
    if(this.cardStack.length > 0){return true;}
    else{return false;}
  };

  this.currentCardIds = function(){
    var ids = [];
    this.cardStack.forEach(function(card){
      ids.push(card.userId);
    });
    this.CardsInScope.forEach(function(card){
      ids.push(card.userId);
    });
    if(ids.length){return JSON.stringify(ids);}
    else {return '[]';}
  }

  this.reloadStack = function() {
    var self = this;
    console.log('Reloading Stack (Cards Service)');
    var params = {
      userId: Users.currentUserId(),
      excludeId: self.currentCardIds()
    };

    Backend.get('/userStack', params, function(data, status) {
      data = Users.addUserMethods(data);
      Connections.logPotentialConnections(data);
      self.cardStack = self.cardStack.concat(data);
      LocalStorage.writeCardsToLocal(self.cardStack);
    });
  };

  this.acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId + ''
    };

    Backend.post('/userStack/approve', params, function(data) {
      Connections.checkNewConnections(userId);
      console.log('User Accept Post Success');
    });
  };

  this.rejectUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId
    };

    Backend.post('/userStack/reject', params, function(data) {
      console.log('User Reject Post Success');
    });
  };

  this.reset = function() {
    console.log('calling: reset');
    var params = {
      userId: Users.currentUserId()
    }

    Backend.post('/userStack/resetStack', params, function(data) {
      console.log('User Reset Post Success');
    });
  };

this.reset();

}]);







