angular.module('app.cards', [])

/**
 * Ensures that card swiping won't scroll the screen
 */
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

/**
 * This is the controller for the full deck.
 */
.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {

  /** 
   * An Array of cards to be chosen from randomly by $scope.addCard()
   * @type {Array}
   */

  var cardTypes = [
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
      headline: 'Software Engineer at Hack Reactor',
      picture: 'https://media.licdn.com/mpr/mpr/wc_200_200/p/6/000/1ea/073/01afa70.jpg',
      sharedConns: 8,
      totalConns: '500+',
      lastActive: '6h',
      company: 'Hack Reactor',
      interestedIn: ['AngularJS', 'JavaScript', 'Node.js', 'HTML5', 'Backbone.js', 'CSS3', 'D3']
    }
  ];

  // $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);


  /**
   * The currently available array of cards. We start with two and add more as we pull them off. Initially:
   * 0 - Phillip
   * 1 - Ian
   * @type {Array}
   */
  
  $scope.cards = [
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
    }
  ];

  $scope.cardSwiped = function(index) {
    console.log("cardSwiped is being called (cards.js)");
    $scope.removeCard();
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.removeCard = function() {
    console.log('Removing card from $scope.cards (cards.js)');
    $scope.cards.shift();
  };

  $scope.addCard = function() {
    console.log("addCard is being called (cards.js)");
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };

})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  // goAway function is for button clicks
  $scope.goAway = function() {
    console.log('goAway is being called');
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    // console.log("card in CardCtrl: ", card);
    // card.swipe();
  };

});





