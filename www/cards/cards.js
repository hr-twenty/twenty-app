angular.module('app.cards', [])

  // This filter reverses the order of cards array for ng-repeat so that they display in the correct order
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })

/** Ensures that card swiping won't scroll the screen */
.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

/**  This is the controller for the full deck.  */
.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
  
  // Array of cards with mock data
  var sampleCards = [
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

  // Card functions
  // Make a copy of the sample cards to seed the page with initially
  $scope.cards = sampleCards.slice();

  $scope.cardSwiped = function(index) {
    console.log("cardSwiped");
    $scope.removeCard();    
    $scope.addCard();
  };

  $scope.removeCard = function() {
    console.log('Removing card from $scope.cards (cards.js)');
    $scope.cards.shift();
  };

  $scope.addCard = function() {
    console.log('Adding more cards.');
    $scope.cards.push(angular.extend({}, sampleCards[Math.floor(Math.random() * sampleCards.length)]));
  };

  $scope.goAway = function() {
    console.log('CALLING goAWAY');
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    console.log('Scope', $scope);
    console.log('Card: ', card);
    // card.swipe();
  };

})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  // goAway function is for button clicks


  $scope.goAway = function() {
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    // console.log("card in CardCtrl: ", card);
    // card.swipe();
  };
});











