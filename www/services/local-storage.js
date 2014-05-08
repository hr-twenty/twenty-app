angular.module('app.services.localStorage', [])

.service('LocalStorage', [function() {

	// Cards functions
	this.writeCardsToLocal = function(data) {
		// save the stack to local storage
		console.log('Writing cards to localStorage. (LS)');
		window.localStorage.cards = JSON.stringify(data);
	};

	this.getCardsFromStorage = function() {
		console.log('Getting cards from localStorage. (LS)');
		// return the cards from LS out
		if(window.localStorage.cards){return JSON.parse(window.localStorage.cards);}
	};

	this.writeScopeCardsToLocal = function(data) {
		// save the stack to local storage
		console.log('DATA to write to ScopeCards Local', data);
		console.log('Writing SCOPE cards to localStorage. (LS)');
		window.localStorage.scopeCards = JSON.stringify(data);
		console.log('localStorage.scopeCards ', window.localStorage.scopeCards);
	};

	this.getScopeCardsFromStorage = function() {
		console.log('Getting SCOPE cards from localStorage. (LS)');
		// return the cards from LS out
		var savedScopeCards = JSON.parse(window.localStorage.scopeCards);
		console.log('savedScopeCards: ', savedScopeCards);
		return savedScopeCards;
	};

	this.hasScopeCards = function() {
		if(window.localStorage.scopeCards) {
			return true;
		}
		return false;
	}


	this.hasCards = function() {
		// TODO: Uncomment this and see if loading can get cards out of LS
		// return a boolean communicating if there are cards in LS
		// if (window.localStorage.cards) {
		// 	return true;
		// }
		return false;
	};

	// Messages functions
	this.setMessageData = function(data) {
		window.localStorage.messages = JSON.stringify(data);
	};

	this.getMessageData = function() {
		if(window.localStorage.messages){return JSON.parse(window.localStorage.messages);}
	};

	this.hasMessageData = function() {
		if(window.localStorage.messages) {
			return true;
		}
		return false;
	};

	// User functions
	this.getUserData = function() {
		if(window.localStorage.user){return JSON.parse(window.localStorage.user);}
	};

	this.setUserData = function(data) {
		window.localStorage.user = JSON.stringify(data);
	};

	this.hasUserData = function() {
		if(window.localStorage.user) {
			return true;
		}
		return false;
	};

}]);