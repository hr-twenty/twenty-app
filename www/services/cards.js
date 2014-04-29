angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {

  var getAllCards = function(callback) {
  	var params = {
  		userId: Users.currentUserId
  	};

  	Backend.get('/userStack', params, function(data, status) {
  		if(callback) callback(data);
  	});
  }

  var getOneCard = function(callback) {
  	console.log('Getting card in service');	
  	var card = angular.extend({}, cards[Math.floor(Math.random() * cards.length)]);
  	return card;
  }

	return {
		getAllCards: getAllCards,
		getOneCard: getOneCard
	}
}]);







