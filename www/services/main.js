angular.module('app.services.main', [
  
])

.factory('Users', function($http, $q, Errors, _) {

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

  return userDetails;

});