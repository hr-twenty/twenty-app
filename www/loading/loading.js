angular.module('app.loading', [])
	.controller('LoadingCtrl', ['$interval', '$state', 'LocalStorage', 'Cards', 'Users', function($interval, $state, LocalStorage, Cards, Users){

		var ready = {
			cards: false,
			user: false
		};

		// if there are < 10 cards currently in the stack, get some
		var initialize = function() {

			if(LocalStorage.hasCards()) {
				Cards.getCardsFromStorage();
				// Cards.cardStack = LocalStorage.getCardsFromStorage();
				ready.cards = true;
			} else {
				Cards.getAllCards(function() {
					ready.cards = true;
				});
			}

			if(LocalStorage.hasUserData()) {
				User.getUserInfoFromStorage();
				ready.user = true;
			} else {
				User.getUserInfo(function() {
					ready.user = true;
				});
			}

			var intPromise = $interval(function() {
				if(ready.cards && ready.users) {
					intPromise.cancel();
					$state.go('main.home');
				}
			}, 50);

		}();

	}]);