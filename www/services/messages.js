angular.module('app.services.messages', [])

.factory('Messages', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {

	// Test data
  userMessages = { 
		'uniqId123': {
			convoId: 'uniqId123',
			contactId: '5678909876',
	    contactDisplayName: 'Robert H.',
	    contactCompany: 'Flashbang Media',
	    contactConnDate: new Date(),
	    contactPicture: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/000/1ea/073/01afa70.jpg',
	    contactMessages: [
	      { id: '001',
	      sender: 'not-you',
	      text: 'How come you never talk to me?',
	      sendTime: new Date("Sat Apr 26 2014 16:30:46 GMT-0700")},
	      { id: '002',
	      sender: 'not-you',
	      text: 'But seriously, how come you never talk to me?',
	      sendTime: new Date("Sat Apr 26 2014 16:31:46 GMT-0700")},
	      { id: '003',
	      sender: 'not-you',
	      text: '"I wouldn\'t be against coming up with an idea" to modify the rule so pitchers could get a better grip on the ball in cold weather, Girardi said. "It would be a great time for someone to start looking at" finding one substance pitchers would be allowed to use.',
	      sendTime: new Date("Sat Apr 26 2014 16:32:46 GMT-0700")},
	      { id: '005',
	      sender: 'you',
	      text: 'STFU',
	      sendTime: new Date("Sat Apr 26 2014 16:38:46 GMT-0700")}
	    ],
	    contactMessagePreview: function() { 
	      // this can be refactored to a ternary, also needs another helper. works for now.
	      if(this.contactMessages) {
	        return this.contactMessages[this.contactMessages.length-1].text.substring(0,30) + '...';
	      } else {
	        return 'Connected on ' + $filter('date')(this.contactConnDate, 'mmm dd, YYYY');
	      }
	    }
	  },

	  'uniqId124': {
	  	convoId: 'uniqId124',
	  	contactDisplayName: 'Ian L.',
	  	contactCompany: 'BrightTALK',
	  	contactConnDate: new Date("April 24, 2013"),
	  	contactPicture: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/4/000/12c/25e/32d438e.jpg',
	  	contactMessagePreview: function() { 
	  	  // this can be refactored to a ternary, also needs another helper. works for now.
	  	  if(this.contactMessages) {
	  	    return this.contactMessages[this.contactMessages.length-1].text.substring(0,30) + '...';
	  	  } else {
	  	    return 'Connected on ' + $filter('date')(this.contactConnDate, 'MMM dd, yyyy');
	  	  }
	  	}
	  }
  };

  var sendMessage = function(msgObj) {
  	console.log("running sendMessage");
  	if(Object.prototype.toString.call(msgObj) === '[object Object]') {
  		
  		userMessages.uniqId123.contactMessages.push(msgObj);
  		msgObj.sendTime = new Date();
  		msgObj.sender = 'you';
  		// TODO: msgObj.sender = Users.currentUserId;

  		Backend.post('/conversations', JSON.stringify(msgObj), function() {
				console.log('sendMessage executed successfully.');
  		});
  	} else {
  		throw new Error("sendMessage expects an object, which should have text and recipient keys.");
  	}
  };

  // lastMessages should be an array of objects and each object should have two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
  var getAllMessages = function(lastMessages) {
  	// TODO: Write a helper function to generate lastMessages
		var currentUserId = Users.currentUserId;
		var params = {
			currentUserId: currentUserId,
			messages: lastMessages || []
		};

		Backend.get('/conversations/all', params, function(data, status) {
			console.log('getAllMessages output: ', data);
		});
	};

	// params should be a single object with two keys: otherId (the ID of the other user) and mostRecentMsg, the index of the most recent received message from that user
	var getOneMessage = function(params) {
		if(!otherUserId) throw new Error("getOneMessage error: argument otherUserId is required.");
		var currentUserId = Users.currentUserId;
		Backend.get('/conversations/one', params, function(data, status) {
			console.log('getOneMessage output: ', data);
		});
	};

  return {
    all: function() {
      return userMessages;
    },
    get: function(convId) {
    	return userMessages[convId];
    },
    sendMessage: sendMessage,
    getAllMessages: getAllMessages,
    getOneMessage: getOneMessage
  }
}]);