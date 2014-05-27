angular.module('app.services.connections', [])

.service('Connections', ['$state', 'Users', 'Messages', function ($state, Users, Messages) {

  var storage = {
    callbacks: {},
    potentials: {}
  };

  this.currentConnection = {};

  this.logPotentialConnections = function(userArr) {
    console.log('logging potential users.');
    angular.forEach(userArr, function(user, i) {
      if(user.otherToUserRel === 'APPROVED') {
        storage.potentials[user.userId] = user;
      }
    });
  };

  this.on = function(event, callback) {
    storage.callbacks[event] = callback;
  };

  this.notify = function(event) {
    storage.callbacks[event]();
  };

  this.checkNewConnections = function(userId) {
    if(storage.potentials[userId]) {
      // expose user data to the controller for use in the modal
      this.currentConnection = storage.potentials[userId];
      var self = this;
      var params = {otherId: userId, mostRecentMsg: new Date().getTime() - 60000 };
      setTimeout(function() {
        Messages.getOneMessage(params, function(data) {
          console.log('getOneMessage inside of checkNewConnections returned with: ', data);
          // notification inside the message callback to ensure it happens after the conversation is created + pulled down
          self.notify('newConnect');
        });
      }, 400);
    }
  };

  }]);