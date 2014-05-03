angular.module('app.services.messages', [])

.service('Messages', ['$filter', '$http', '$interval', '$ionicModal', 'Users', 'Backend', 'LocalStorage', function($filter, $http, $interval, $ionicModal, Users, Backend, LocalStorage) {

	this.storage = {
		numMessages: 0,
		firstCheck: true,
		callbacks: {}
	};

	this.on = function(event, callback) {
		// intentionally only allow a single callback per event
		this.storage.callbacks[event] = callback;
	};


	var notify = function(event) {
		this.storage.callbacks[event]();
	}

	var lastMessageTime = function(convoObj) {
		return new Date(parseInt(convoObj.messages[convoObj.messages.length-1].time)).getTime().toString();
	};


  var extendConversation = function(convoObj) {

  	var instantiate = function(singleObj) {
	  	var truncateString = function(str, maxLen) {
	  		if (str.length > maxLen) {
	  			return str.substring(0, maxLen) + '...';
	  		} else {
	  			return str;
	  		}
	  	};

	  	var mixIn = {
		  	contactMessagePreview: function() { 
		  		return '';
		  		console.log(singleObj.messages);
		  		// using length-2 because length-1 is the kickoff system message
		      if(singleObj.messages && singleObj.messages.length > 1) {
		        return truncateString(singleObj.messages[singleObj.messages.length-2].text, 30);
		      } else {
		        return 'Connected on ' + $filter('date')(new Date(parseInt(singleObj.connectDate)), 'MMM d, yyyy');
		      }
		    },
		    lastMessage: function() {
		    	var msgArray = singleObj.messages; 
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

	  	return _.extend(singleObj, mixIn);
  	};

  	// deal with both single objects and arrays of object
  	if(Array.isArray(convoObj)) {
  		_.forEach(convoObj, function(element, index) {
  			convoObj[index] = instantiate(element);
  		});
  		return convoObj;
  	} else {
	  	return instantiate(convoObj);
  	}
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

  this.addOneConversationToStorage = function(msgObj) {
		if(this.storage.conversations) {
			for (var i = 0; i < this.storage.conversations.length; i++) {
				var element = this.storage.conversations[i];
				if(element.other.userId === msgObj.otherId) { // Ensuring that the otherId is type 'string'
					msgObj.sender = msgObj.userId;
					element.messages.push(msgObj);
				}
			};
			LocalStorage.setMessageData(this.storage);
		} else {
			throw new Error('Messages.storage isn\'t yet defined.');
		}
  };

  this.getAllMessages = function(lastMessages, callback) {
	  // lastMessages should be an array of objects and each object should have two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
		var self = this;

		Backend.get('/conversations/all', {userId: Users.currentUserId()}, function(data, status) {
			data = extendConversation(data);
			self.checkNewConnections(data);
			self.storage.conversations = data;
			self.storage.lastFetch = new Date();
			LocalStorage.setMessageData(self.storage);

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

	/**
	 * @name getOneMessage
	 * @type {function}
	 * @param {object} params Two keys: otherId and mostRecentMsg, a Unix timestamp
	 */
	
	this.getOneMessage = function(params, callback) {
		if(params.otherId && params.mostRecentMsg) {
			params.userId = Users.currentUserId();
			var storedConversations = this.storage.conversations;
			var self = this;
			var found = false;

			Backend.get('/conversations/one', params, function(data, status) {
				if(data[0] && data[0].messages.length) {
					_.forEach(storedConversations, function(elem, i) {
						if(elem.other.userId === params.otherId) {
							_.forEach(data[0].messages, function(newMsg, index) {
								storedConversations[i].messages.push(newMsg);
							});
						}
					});
					found = true;
				}
				if(callback) callback(found);
			});
		} 
	};

	this.initialize = function(context) {
		// delete window.localStorage.messages;
		if(LocalStorage.hasMessageData()) {
			// console.log('found saved message data in messages.initialize');
			this.storage = LocalStorage.getMessageData();

			// console.log('saved message data looks like:', this.storage);
			if(this.storage.conversations.length && !this.storage.conversations[0].otherDisplayName) {
				_.forEach(this.storage.conversations, function(element, i) {
					this.storage.conversations[i] = extendConversation(element);
				});
			}
			
			if(this.storage.conversations) {
				lastMessages = makeArrayOfRecentMessages(this.storage.conversations);
			} 
		} else {
			this.storage = {
					numMessages: 0,
					firstCheck: true
				};
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

	this.checkNewConnections = function(dataObj) {
		if(this.storage.firstCheck) {
			this.storage.numMessages = dataObj.length
			this.storage.firstCheck = false;
		} else {
			if(dataObj.length > this.storage.numMessages) {
				this.storage.numMessages = dataObj.length;
				var self = this;
				// where does the userId come from here?
				Users.getUserInfo(userId, function(data) {
					self.storage.newConnection = data;
					self.notify('newConnect');
				});
			}
		}
	};

}]);
