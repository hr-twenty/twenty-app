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
				console.log('found saved user data.');
				Users.getUserInfoFromStorage();
				ready.user = true;
			} else {
				console.log('getting user data (loading.js)')
				Users.getUserInfo(function() {
					ready.user = true;
					console.log('got user data (loading.js)')
				});
			}

			var intPromise = $interval(function() {
				if(ready.cards && ready.user) {
					$interval.cancel(intPromise);
					$state.go('main.home');
				}
			}, 50);

		}();

	}]);