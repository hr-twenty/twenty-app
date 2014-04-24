angular.module('twenty', ['ionic'])

	.controller('TwentyCtrl', ['$scope', function($scope){
		$scope.settings = [
		  {link:'#/availability', title: 'Availability'},
	  	{link:'#/myprofile', title: 'My profile'},
  		{link:'#/gopremium', title: 'Go premium'},
		];

    $scope.userDetails = {
      firstName: 'Phillip',
      lastName: 'Alexander',
      headline: 'Lead Curriculum Engineer and Instructor at Hack Reactor',
      picture: 'http://m.c.lnkd.licdn.com/mpr/pub/image-j6v5l_OUXAkqLzgAKsXKIqO3W4InFkzsl6BKJTZUBX-nFZU7S6vKJG9NBBqtzBET4dC/phillip-p-alexander.jpg',
      sharedConns: 1,
      lastActive: '5h',
      company: 'Hack Reactor',
      interestedIn: ['AngularJS', 'Angel Investing', 'JavaScript', 'Business Development', 'Mobile Apps']
    };
	}])
;
