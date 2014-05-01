angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', 'LocalStorage', function($filter, $http, Users, Backend, LocalStorage) {

  var cardStack = [];

  var getAllCards = function(callback) {
  	var params = {
  		userId: Users.currentUserId()
  	};

  	Backend.get('/userStack', params, function(data, status) {
  		cardStack = data;
  	});
  }

  getAllCards();

  // setInterval(function(){console.log('cardStack (service)', cardStack);}, 500);

  var reloadStack = function() {
    console.log('Reloading Stack');
    getAllCards(function(data) {
      data.forEach(function(card) {
        console.log('cardStack', cardStack);
        cardStack.push(card);
      })
    });
  }

  var acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId + ''
    };

    Backend.post('/userStack/approve', params, function(data) {
      console.log('User Accept Post Success');
    });
  }

  var rejectUser = function(userId) {
    var params = {
      userId: Users.currentUserId(),
      otherId: userId
    };

    Backend.post('/userStack/reject', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

  var reset = function() {
    console.log('calling: reset');
    var params = {
      userId: Users.currentUserId()
    }

    Backend.post('/userStack/reset', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

  // reset();

	return {
		getAllCards: getAllCards,
    acceptUser: acceptUser,
    rejectUser: rejectUser,
    cardStack: cardStack,
    reloadStack: reloadStack,
    reset: reset
	}
}]);







