angular.module('app.loading', [])
	.controller('LoadingCtrl', ['$interval', '$state', '$location', 'LocalStorage', 'Cards', 'Users', 'Connections', function($interval, $state, $location, LocalStorage, Cards, Users, Connections){

		var ready = {
			cards: false,
			user: false
		};

		var initialize = function() {
			// if($location.$$search.userId) {
			// 	Users.setCurrentUserId($location.$$search.userId);
			// }

			if(LocalStorage.hasCards()) {
				Cards.cardStack = LocalStorage.getCardsFromStorage();
				Connections.logPotentialConnections(Cards.cardStack);
				ready.cards = true;
			} else {
				Cards.getAllCards(function(cards) {
					cards = Users.addUserMethods(cards);
					Connections.logPotentialConnections(cards);
					LocalStorage.writeCardsToLocal(cards);
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