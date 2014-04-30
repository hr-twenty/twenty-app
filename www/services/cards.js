angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {

  var getAllCards = function(limit, callback) {
  	var params = {
  		userId: Users.currentUserId,
      limit: limit
  	};

  	Backend.get('/userStack', params, function(data, status) {
  		if(callback) callback(data);
  	});
  }

  var acceptUser = function(userId) {
    var params = {
      userId: Users.currentUserId,
      otherId: userId
    };

    Backend.post('/userStack/approve', params, function(data) {
      console.log('User Accept Post Success');
    });
  }

  var rejectUser = function(userId) {
    var params = {
      userId: Users.currentUserId,
      otherId: userId
    };

    Backend.post('/userStack/reject', params, function(data) {
      console.log('User Reject Post Success');
    });
  }

	return {
		getAllCards: getAllCards,
    acceptUser: acceptUser,
    rejectUser: rejectUser
	}
}]);







