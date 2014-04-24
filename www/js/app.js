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
      image: 'http://placehold.it/110x110&text=Profile+Pic',
      sharedConns: 1,
      lastActive: '5h',
      company: 'Hack Reactor',
      interestedIn: ['AngularJS', 'Angel Investing', 'JavaScript', 'Business Development', 'Mobile Apps']
    };
	}])
;
