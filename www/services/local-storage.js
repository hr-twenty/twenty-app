angular.module('app.services.localStorage', [])

.service('LocalStorage', ['$filter', 'Backend', function($filter, Backend) {

	// Cards functions
	this.writeCardsToLocal = function(data) {
		// save the stack to local storage
		console.log('Writing cards to localStorage.');
		window.localStorage.cards = JSON.stringify(data);
	};

	this.getCardsFromStorage = function() {
		// return the cards from LS out
		return JSON.parse(window.localStorage.cards);
	};

	this.hasCards = function() {
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
		return JSON.parse(window.localStorage.messages);
	};

	this.hasMessageData = function() {
		if(window.localStorage.messages) {
			return true;
		}
		return false;
	};

	// User functions
	this.getUserData = function() {
		return JSON.parse(window.localStorage.user);
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