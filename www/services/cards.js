angular.module('app.services.cards', [])

.service('Cards', ['$filter', '$http', 'Users', 'Backend', function($filter, $http, Users, Backend) {
	var cards = [
    {
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
    },
    {
      firstName: 'Ian',
      lastName: 'Lyons',
      displayName: function() {
        return this.firstName + ' ' + this.lastName[0] + '.';
      },
      headline: 'Growth engineer',
      picture: 'https://media.licdn.com/media/p/4/000/12c/25e/32d438e.jpg',
      sharedConns: 5,
      totalConns: '500+',
      lastActive: '3h',
      company: 'BrightTALK',
      interestedIn: ['HTML', 'CSS', 'JavaScript', 'Kittens', 'Bikini Waxing', 'Brogramming']
    },
    {
      firstName: 'Robert',
      lastName: 'Holmes',
      displayName: function() {
        return this.firstName + ' ' + this.lastName[0] + '.';
      },
      headline: 'Project Manager at Twenty Inc.',
      picture: 'https://media.licdn.com/mpr/mpr/wc_200_200/p/6/000/1ea/073/01afa70.jpg',
      sharedConns: 8,
      totalConns: '500+',
      lastActive: '6h',
      company: 'Twenty Inc.',
      interestedIn: ['AngularJS', 'JavaScript', 'Node.js', 'HTML5', 'Pizza', 'Beer', 'Hugs']
    }
  ];

  var getAllCards = function() {
  	var params = {
  		userId: Users.currentUserId
  	};

  	var serverCards;
  	Backend.get('/userStack', params, function(data, status) {
  		cards = data;
  	});

  	return cards;
  }

  var getOneCard = function() {
  	console.log('Getting card in service');	
  	var card = angular.extend({}, cards[Math.floor(Math.random() * cards.length)]);
  	return card;
  }

	return {
		getAllCards: getAllCards,
		getOneCard: getOneCard
	}
}]);







