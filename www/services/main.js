angular.module('app.services.main', [])

.factory('Users', function() {

	// Test data
  var userDetails = {
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

  return {
    all: function() {
      return userDetails;
    }
  }

})

.service('StateControl', ['$state', '$ionicSideMenuDelegate', function($state, $ionicSideMenuDelegate) {

  this.toggleMenuByState = function(stateParams) {
    if(stateParams.menuState) {
      // open the appropriate menu
      if(stateParams.menuState === 'conversations') {
        $ionicSideMenuDelegate.toggleRight();
      } else if (stateParams.menuState === 'settings') {
        $ionicSideMenuDelegate.toggleLeft();
      }
    } else {
      if($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();  
      }
      if($ionicSideMenuDelegate.isOpenRight()) {
        $ionicSideMenuDelegate.toggleRight(); 
      }
    }
  };

  this.goBackWithState = function(stateName, menuState) {
    return function() {
      $state.go(stateName, {'menuState' : menuState});
    };
  };

}])
;