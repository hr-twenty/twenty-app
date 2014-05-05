angular.module('app.loading', [])
	.controller('LoadingCtrl', ['$interval', '$state', '$location', 'LocalStorage', 'Cards', 'Users', function($interval, $state, $location, LocalStorage, Cards, Users){

		var ready = {
			cards: false,
			user: false
		};

		var initialize = function() {
			if($location.$$search.userId) {
				Users.setCurrentUserId($location.$$search.userId);
			}

			if(LocalStorage.hasCards()) {
				console.log('found cards saved in LocalStorage.');
				Cards.cardStack = LocalStorage.getCardsFromStorage();
				ready.cards = true;
			} else {
				Cards.getAllCards(function(userData) {
					userData = Users.addUserMethods(userData);
					LocalStorage.writeCardsToLocal(userData);
					console.log('getting cards from storage');
					ready.cards = true;
				});
			}

			if(LocalStorage.hasUserData()) {
				Users.getUserInfoFromStorage();
				ready.user = true;
			} else {
				Users.setCurrentUserInfo(function() {
					ready.user = true;
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