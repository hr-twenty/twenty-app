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
  Cards.getAllCards(function(data) {
    $scope.cards = data;
  });

  var reloadStack = function() {
    console.log('Reloading Stack');
    Cards.getAllCards(function(data) {
      data.forEach(function(card) {
        $scope.cards.push(card);
      })
    });
  }

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
    console.log('Adding card to scope');
    if ($scope.cards.length <= 5) {
      reloadStack();
    }
  };

  $scope.goAway = function() {
    console.log('CALLING goAWAY');
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
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











