angular.module('app.loading', [])
	.controller('LoadingCtrl', ['$interval', '$state', 'LocalStorage', 'Cards', 'Users', function($interval, $state, LocalStorage, Cards, Users){

		var ready = {
			cards: false,
			user: false
		};

		// if there are < 10 cards currently in the stack, get some
		var initialize = function() {
			console.log('initializing');
			if(LocalStorage.hasCards()) {
				Cards.getCardsFromStorage();
				// Cards.cardStack = LocalStorage.getCardsFromStorage();
				ready.cards = true;
			} else {
				console.log('getting all cards (loading.js)')
				Cards.getAllCards(function() {
					ready.cards = true;
					console.log('got all cards (loading.js)')
				});
			}

			if(LocalStorage.hasUserData()) {
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
				console.log('inside interval');
				if(ready.cards && ready.user) {
					console.log('Ready to proceed');
					$interval.cancel(intPromise);
					console.log('routing to main.home (loading.js)')
					$state.go('main.home');
				}
			}, 50);

		}();

	}]);