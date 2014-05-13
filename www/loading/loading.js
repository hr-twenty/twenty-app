angular.module('app.loading', [])
	.controller('LoadingCtrl', ['$interval', '$state', '$location', 'Cards', 'Users', 'Connections', function($interval, $state, $location, Cards, Users, Connections){

		var ready = {
			cards: false,
			user: false
		};

		var initialize = function() {
			if(Users.currentUserData()) {
				ready.user = true;
			} else {
				Users.setCurrentUserInfo(function() {
					ready.user = true;
				});
			}

			if(Cards.hasCardsOnStack()) {
      console.log('hasCardsOnStack: true');

				Connections.logPotentialConnections(Cards.cardStack);
				ready.cards = true;
			} else {
				Cards.getAllCards(function() {
      		console.log('hasCardsOnStack: false');
					ready.cards = true;
				});
			}

			var intPromise = $interval(function() {
				if(ready.cards && ready.user) {
					$interval.cancel(intPromise);
					$state.go('main.home');
				}
			}, 1000);

		}();

	}]);