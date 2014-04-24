angular.module('directory.controllers', [])

	.controller('MainIndexCtrl', ['$scope', '$filter', function($scope, $filter){

    $scope.userDetails = {
      firstName: 'Phillip',
      lastName: 'Alexander',
      displayName: function() {
        return this.firstName + ' ' + this.lastName[0] + '.';
      },
      headline: 'Lead Curriculum Engineer and Instructor at Hack Reactor',
      picture: 'http://m.c.lnkd.licdn.com/mpr/pub/image-j6v5l_OUXAkqLzgAKsXKIqO3W4InFkzsl6BKJTZUBX-nFZU7S6vKJG9NBBqtzBET4dC/phillip-p-alexander.jpg',
      sharedConns: 1,
      totalConns: '500+',
      lastActive: '5h',
      company: 'Hack Reactor',
      interestedIn: ['AngularJS', 'Angel Investing', 'JavaScript', 'Business Development', 'Mobile Apps']
    };
	}])

	.controller('SettingsCtrl', ['$scope', '$filter', function($scope, $filter){
		$scope.settings = [
	  	{link:'#/myprofile', title: 'My profile', icon:'ion-person'},
  		{link:'#/logout', title: 'Log out', icon:'ion-log-out'}
		];
	}])

	.controller('MessagesCtrl', ['$scope', '$filter', function($scope, $filter){
		$scope.userMessages = [
		  { id: 1,
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






