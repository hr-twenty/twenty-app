angular.module('app.messages.details' , [])

.controller('MessagesDetailsCtrl', ['$scope', '$filter', '$stateParams', function($scope, $filter, $stateParams) {

	$scope.cId = $stateParams.conversationId;

	$scope.conversations = [
	  { id: 1,
	    contactDisplayName: 'Robert H.',
	    contactCompany: 'Flashbang Media',
	    contactConnDate: new Date(),
	    contactPicture: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/000/1ea/073/01afa70.jpg',
	   contactMessages: [
		      { id: '001',
		      sender: 'not-you',
		      text: 'How come you never talk to me?',
		      sendTime: new Date("Fri Apr 25 2014 09:03:14 GMT-0700 (PDT)")},
		      { id: '002',
		      sender: 'not-you',
		      text: 'But seriously, how come you never talk to me?',
		      sendTime: new Date("Fri Apr 25 2014 09:04:14 GMT-0700 (PDT)")},
		      { id: '003',
		      sender: 'not-you',
		      text: '"I wouldn\'t be against coming up with an idea" to modify the rule so pitchers could get a better grip on the ball in cold weather, Girardi said. "It would be a great time for someone to start looking at" finding one substance pitchers would be allowed to use.',
		      sendTime: new Date("Fri Apr 25 2014 09:05:14 GMT-0700 (PDT)")},
		      { id: '005',
		      sender: 'you',
		      text: 'STFU',
		      sendTime: new Date("Fri Apr 25 2014 09:10:14 GMT-0700 (PDT)")}
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
	  { id: 2,
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
	];
}]);