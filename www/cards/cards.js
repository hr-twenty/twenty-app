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
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', function($scope, $ionicSwipeCardDelegate, Cards) {

  // Get cards from service
  $scope.cards = Cards.getAllCards();

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
    // $scope.cards.push(angular.extend({}, sampleCards[Math.floor(Math.random() * sampleCards.length)]));
    var card = Cards.getOneCard();
    $scope.cards.push(card);
  };

  $scope.goAway = function() {
    console.log('CALLING goAWAY');
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    console.log('Scope', $scope);
    console.log('Card: ', card);
    // card.swipe();
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  // goAway function is for button clicks

  $scope.goAway = function() {
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    // console.log("card in CardCtrl: ", card);
    // card.swipe();
  };
});











