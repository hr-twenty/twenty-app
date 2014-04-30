angular.module('app.services.messages', [])

.service('Messages', ['$filter', '$http', '$interval', 'Users', 'Backend', function($filter, $http, $interval, Users, Backend) {

	var lastMessages;

	var lastMessageTime = function(convoObj) {
		return new Date(parseInt(convoObj.messages[convoObj.messages.length-1].time)).getTime().toString();
	};

  var extendConversation = function(convoObj) {
  	var truncateString = function(str, maxLen) {
  		if (str.length > maxLen) {
  			return str.substring(0, maxLen) + '...';
  		} else {
  			return str;
  		}
  	};

  	var mixIn = {
	  	contactMessagePreview: function() { 
	      if(convoObj.messages.length > 0) {
	        return truncateString(convoObj.messages[convoObj.messages.length-1].text, 30);
	      } else {
	        return 'Connected on ' + $filter('date')(new Date(convoObj.connectDate), 'MMM dd, yyyy');
	      }
	    },
	    lastMessage: function() {
	    	var msgArray = convoObj.messages; 
	    	if(msgArray && msgArray.length) {
		    	var lastMsg = msgArray[msgArray.length-1];
	    		return lastMsg.time;
	    	}
	    	return null;
	    },
	    otherDisplayName: function() {
	    	var firstName = this.other.firstName;
	    	var lastName = this.other.lastName;
	    	return firstName + ' ' + lastName[0].toUpperCase() + '.';
	    }
  	};
  	return _.extend(convoObj, mixIn);
  };

  this.sendMessage = function(msgObj) {
  	if(Object.prototype.toString.call(msgObj) === '[object Object]') {
  		msgObj.time = new Date().getTime().toString();
  		msgObj.userId = Users.currentUserId();
  		this.addOneConversationToStorage(msgObj);
  		Backend.post('/conversations/one', msgObj, function(data) {
				console.log('sendMessage executed successfully.');
  		});
  	} else {
  		throw new Error("sendMessage expects an object, which should have text and recipient keys.");
  	}
  };

	var makeArrayOfRecentMessages = function(array) {
  	var result = {};
  	result.userId = Users.currentUserId();
  	result.messages = [];
  	_.forEach(array, function(element, index) {
  		result.messages.push(element.lastMessage());
  	})
  	return result;
  };

  var writeToStorage = function(dest, object) {
  	window.localStorage[dest] = JSON.stringify(object)
  };

  this.addOneConversationToStorage = function(msgObj) {
		if(this.storage.conversations) {
			for (var i = 0; i < this.storage.conversations.length; i++) {
				var element = this.storage.conversations[i];
				if(element.other.userId === msgObj.otherId) { // Ensuring that the otherId is type 'string'
					msgObj.sender = msgObj.userId;
					msgObj = this.dateFilter(msgObj);
					element.messages.push(msgObj);
				}
			};
			writeToStorage('messages', this.storage);
		} else {
			throw new Error('Messages.storage isn\'t yet defined.');
		}
  };

  this.getAllMessages = function(lastMessages, callback) {
	  // lastMessages should be an array of objects and each object should have two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
		var self = this;

		Backend.get('/conversations/all', {userId: Users.currentUserId()}, function(data, status) {
			_.forEach(data, function(element, index) {
				data[index] = extendConversation(element);
				data[index] = self.dateFilter(element);
			});

			// Update the messagingStorage object and write it back to localStorage
			self.storage.conversations = data;
			self.storage.lastFetch = new Date();
			writeToStorage('messages', self.storage);
			if(callback) callback(data);
		});
	};

	this.oneConversation = function(otherId) {
		if(this.storage.conversations) {
			for (var i = 0; i < this.storage.conversations.length; i++) {
				var element = this.storage.conversations[i];
				if(element.other.userId === otherId + '') { // Ensuring that the otherId is type 'string'
					return element;
				}
			};
		} else {
			throw new Error('Messages.storage isn\'t yet defined.');
		}
	};

	this.dateFilter = function(convoObj) {
		var convertTime = function(element) {
			return $filter('date')(new Date(parseInt(element.time)), "MMM d, y 'at' h:mm a");
		};

		if(convoObj.messages) { // it's a multiple-message conversation
			_.forEach(convoObj.messages, function(element, i) {
				convoObj.messages[i].timeString = convertTime(element);
			});
		} else { // it's just a single message object
			convoObj.timeString = convertTime(convoObj);
		}
		return convoObj;
	};

	/**
	 * @name getOneMessage
	 * @type {function}
	 * @param {object} params Two keys: otherId and mostRecentMsg, a Unix timestamp
	 */
	
	this.getOneMessage = function(params, callback) {
		if(!params.otherId || !params.mostRecentMsg) throw new Error("Invalid argument to getOneMessage.");
		params.userId = Users.currentUserId();
		var storedConversations = this.storage.conversations;
		var self = this;
		var found = false;

		Backend.get('/conversations/one', params, function(data, status) {
			if(data && data[0].messages.length) {
				var newPiece = self.dateFilter(data[0]);
				_.forEach(storedConversations, function(elem, i) {
					if(elem.other.userId === params.otherId) {
						_.forEach(newPiece.messages, function(newMsg, index) {
							storedConversations[i].messages.push(newMsg);
						});
					}
				});
				found = true;
			}
			if(callback) callback(found);
		});
	};

	this.initialize = function(context) {
		if(window.localStorage.messages) {
			context.storage = JSON.parse(window.localStorage.messages);
			if(context.storage.conversations.length && !context.storage.conversations[0].otherDisplayName) {
				_.forEach(context.storage.conversations, function(element, i) {
					context.storage.conversations[i] = extendConversation(element);
				});
			}
			if(context.storage.conversations) lastMessages = makeArrayOfRecentMessages(context.storage.conversations);
		} else {
			context.storage = {};
			var lastMessages = [];
		}
	}(this);


	this.updateRegularly = function($scope, waitTime, callback) {
		var intervalPromise = $interval(function() {
			callback();
		}, waitTime);
		$scope.$on('$destroy', function() {
			$interval.cancel(intervalPromise);
		});
	};

}]);