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
	      if(convoObj.messages) {
	        return truncateString(convoObj.messages[convoObj.messages.length-1].text, 30);
	      } else {
	        return 'Connected on ' + $filter('date')(new Date(convoObj.connectDate), 'mmm dd, YYYY');
	      }
	    },
	    lastMessage: function() {
	    	var msgArray = convoObj.messages; 
	    	if(msgArray) {
		    	var lastMsg = msgArray[msgArray.length-1]
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
  		msgObj.userId = Users.currentUserId;
  		Backend.post('/conversations/one', msgObj, function(data) {
				console.log('sendMessage executed successfully.');
  		});
  	} else {
  		throw new Error("sendMessage expects an object, which should have text and recipient keys.");
  	}
  };

	var makeArrayOfRecentMessages = function(array) {
  	var result = {};
  	result.userId = Users.currentUserId;
  	result.messages = [];
  	_.forEach(array, function(element, index) {
  		result.messages.push(lastMessageTime(element));
  	})
  	return result;
  };

  var addOneConversationToStorage = function() {};

  this.getAllMessages = function(lastMessages, callback) {
		var self = this;
	  // lastMessages should be an array of objects and each object should have two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
		// makeArrayOfRecentMessages(data);
		var params = {
			userId: Users.currentUserId
		};
		Backend.get('/conversations/all', params, function(data, status) {
			// Add some useful functions to each conversation
			_.forEach(data, function(element, index) {
				data[index] = extendConversation(element);
			});
			// Update the messagingStorage object and write it back to localStorage
			self.storage.conversations = data;
			self.storage.lastFetch = new Date();
			window.localStorage.messages = JSON.stringify(self.storage)
			if(callback) callback(data);
		});
	};

	this.oneConversation = function(otherId) {
		if(this.storage.conversations) {
			return _.forEach(this.storage.conversations, function(element, index) {
				if(element.other.userId === otherId + '') { // Ensuring that the otherId is type 'string'
					return element;
				}
			})
		} else {
			throw new Error('Messages.storage isn\'t yet defined.');
		}
	};

	this.dateFilter = function(convoObj) {
		_.forEach(convoObj.messages, function(element, i) {
			convoObj.messages[i].timeString = $filter('date')(new Date(parseInt(element.time)), "MMM d, y 'at' h:mm a");
		});
		return convoObj;
	};

	/**
	 * @name getOneMessage
	 * @type {function}
	 * @param {object} params Two keys: otherId and mostRecentMsg, a Unix timestamp
	 */
	
	this.getOneMessage = function(params, callback) {
		if(!params.otherId || !params.mostRecentMsg) throw new Error("Invalid argument to getOneMessage.");
		params.userId = Users.currentUserId;
		var storedConversations = this.storage.conversations;
		var self = this;
		var found = false;
		Backend.get('/conversations/one', params, function(data, status) {
			if(data[0].messages.length) {
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
		console.log('initializing messages.js...');
		if(window.localStorage.messages) {
			context.storage = JSON.parse(window.localStorage.messages);
			// check to see if the stored conversation already have helpers. if they don't, add them
			if(context.storage.conversations.length && !context.storage.conversations[0].otherDisplayName) {
				console.log('no helpers on the conversation objects, so add them.');
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