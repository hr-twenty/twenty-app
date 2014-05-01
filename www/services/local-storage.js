angular.module('app.services.localStorage', [])

.service('LocalStorage', ['$filter', 'Backend', function($filter, Backend) {

	var getCardsFromStorage = function() {

	}
 
	var writeCardsToLocal = function() {

	}

	var getUserData = function() {

	}

	var setUserData = function() {

	}

	var hasUserData = function() {
		return false;
	}

	var hasCards = function() {
		return false;
	}

	return {
		getCardsFromStorage: getCardsFromStorage,
		writeCardsToLocal: writeCardsToLocal,
		getUserData: getUserData,
		setUserData: setUserData,
		hasUserData: hasUserData,
		hasCards: hasCards 
	}
}]);