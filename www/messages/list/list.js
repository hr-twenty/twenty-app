angular.module('app.messages.list', [])

	.controller('MessagesListCtrl', ['$scope', '$filter', function($scope, $filter){
		$scope.conversations = { 
			'uniqId123': {
				convoId: 'uniqId123',
		    contactDisplayName: 'Robert H.',
		    contactCompany: 'Flashbang Media',
		    contactConnDate: new Date(),
		    contactPicture: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/000/1ea/073/01afa70.jpg',
		    contactMessages: [
		      { id: '001',
		      sender: 'not-you',
		      text: 'How come you never talk to me?',
		      sendTime: new Date("April 23, 2014 10:20am")},
		      { id: '002',
		      sender: 'not-you',
		      text: 'But seriously, how come you never talk to me?',
		      sendTime: new Date("April 23, 2014 10:21am")},
		      { id: '003',
		      sender: 'not-you',
		      text: '"I wouldn\'t be against coming up with an idea" to modify the rule so pitchers could get a better grip on the ball in cold weather, Girardi said. "It would be a great time for someone to start looking at" finding one substance pitchers would be allowed to use.',
		      sendTime: new Date("April 23, 2014 10:22am")},
		      { id: '005',
		      sender: 'you',
		      text: 'STFU',
		      sendTime: new Date("April 23, 2014 10:28am")}
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
	}]);