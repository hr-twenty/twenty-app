angular.module('app.services.messages', [])

.service('Messages', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {

	var messagingStorage = messagingStorage || {};


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
	        return truncateString(convoObj.messages[convoObj.messages.length-1].text, 35);
	      } else {
	        return 'Connected on ' + $filter('date')(new Date(convoObj.connectDate), 'mmm dd, YYYY');
	      }
	    },
	    lastMessage: function() {
	    	var msgArray = convoObj.messages; 
	    	if(msgArray) {
		    	var lastMsg = msgArray[msgArray.length-1]
	    		return lastMsg.sendTime;
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

  var sendMessage = function(msgObj) {
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

  var getAllMessages = function(lastMessages, callback) {
	  // lastMessages should be an array of objects and each object should have two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
  	// TODO: Write a helper function to generate lastMessages
		var params = {
			userId: Users.currentUserId
		};

		Backend.get('/conversations/all', params, function(data, status) {
			// Add some useful functions to each conversation
			_.forEach(data, function(element, index) {
				data[index] = extendConversation(element);
			});
			messagingStorage.conversations = data;
			messagingStorage.lastFetch = new Date();
			if(callback) callback(data);
		});
	};

	var oneConversation = function(otherId) {
		if(messagingStorage.conversations) {
			return _.forEach(messagingStorage.conversations, function(element, index) {
				if(element.other.userId === otherId + '') {
					return element;
				}
			})
		} else {
			throw new Error('messagingStorage.conversations isn\'t yet defined.');
		}
	};

	var dateFilter = function(convoObj) {
		_.forEach(convoObj.messages, function(element, i) {
			convoObj.messages[i].timeString = $filter('date')(new Date(parseInt(element.time)), "MMM d, y 'at' h:mm a");
		});
		return convoObj;
	};

	// params should be a single object with two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
	var getOneMessage = function(params, callback) {
		// console.log(params);
		if(!params.otherId || !params.mostRecentMsg) throw new Error("getOneMessage error: parameters object should have otherId and mostRecentMsg timestamp.");
		params.userId = Users.currentUserId;
		Backend.get('/conversations/one', params, function(data, status) {
			console.log('getOneMessage output: ', data);
			if(callback) callback(data);
		});
	};

	var lastMessageTime = function(convoObj) {
		return new Date(parseInt(convoObj.messages[convoObj.messages.length-1].time)).getTime().toString();
	};

  return {
    sendMessage: sendMessage,
    getAllMessages: getAllMessages,
    getOneMessage: getOneMessage,
    conversations: messagingStorage.conversations,
   	lastFetch: messagingStorage.lastFetch,
   	oneConversation: oneConversation,
   	dateFilter: dateFilter,
   	lastMessageTime: lastMessageTime
  }
}]);