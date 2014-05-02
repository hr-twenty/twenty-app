angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', 'LocalStorage', function($filter, $http, Users, Backend, LocalStorage) {

  this.cardStack = [];

  this.loaded = false;

  this.getAllCards = function(callback) {
    console.log('Making get request for cards');
    var self = this;
  	var params = {
  		userId: Users.currentUserId()
  	};

  	Backend.get('/userStack', params, function(data, status) {
      console.log('DATA', data);
  		self.cardStack = data;
      console.log('cardStack (Cards)', self.cardStack);
      callback(data); 
    });
  }

  // ISSUE: getAllCards resets the whole stack, while reloadStack should add to it (the callback adds cards twice)
  this.reloadStack = function() {
    var self = this;
    console.log('Reloading Stack (Cards Service)');
    var params = {
      userId: Users.currentUserId()
    };

    Backend.get('/userStack', params, function(data, status) {
      console.log('DATA', data);
      data.forEach(function(card) {
        self.cardStack.push(card);
      });
      LocalStorage.writeCardsToLocal(self.cardStack);
      console.log('cardStack (Cards)', self.cardStack); 
    });

    // Changed this so that reload stack doen't use .getAllCards anymore (doing so overwrites stack)
    // this.getAllCards(function(data) {
    //   data.forEach(function(card) {
    //     self.cardStack.push(card);
    //   })
    // });
  }

  this.acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId + ''
    };

    Backend.post('/userStack/approve', params, function(data) {
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

}]);







