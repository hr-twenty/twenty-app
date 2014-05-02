angular.module('app.services.localStorage', [])

.service('LocalStorage', ['$filter', 'Backend', function($filter, Backend) {

	// Cards functions
	this.getCardsFromStorage = function() {

	};
 
	this.writeCardsToLocal = function() {

	};

	this.hasCards = function() {
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