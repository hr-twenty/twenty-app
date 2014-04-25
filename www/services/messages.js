angular.module('app.services.messages', [
  
])

.factory('Messages', ['$filter', function($filter) {

	// Test data
  userMessages = [
	  { id: 0,
	    contactDisplayName: 'Robert H.',
	    contactCompany: 'Flashbang Media',
	    contactConnDate: new Date(),
	    contactPicture: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/000/1ea/073/01afa70.jpg',
	   contactMessages: [
	      { id: 'uasiokdjha',
	      text: 'How come you never talk to me?',
	      sendTime: new Date("April 23, 2014")}
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
	  { id: 1,
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

  return {
    all: function() {
      return userMessages;
    },
    get: function(convId) {
    	return userMessages[convId];
    }
  }
}]);