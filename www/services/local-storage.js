angular.module('app.services.localStorage', [])

.service('LocalStorage', ['$filter', 'Users', 'Backend', function($filter, Users, Backend) {

	var getCardsFromStorage = function() {

	}
 
	var writeCardsToLocal = function() {

	}

	var getUserData = function() {

	}

	var setUserData = function() {

	}

	var hasUserData = function() {

	}

	var hasCards = function() {
	
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