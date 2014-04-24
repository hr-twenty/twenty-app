angular.module('twenty', ['ionic'])

	.controller('TwentyCtrl', ['$scope', function($scope){
		$scope.settings = [
		{link:'#/availability', title: 'Availability'},
		{link:'#/myprofile', title: 'My profile'},
		{link:'#/gopremium', title: 'Go premium'},
		];
	}])
;