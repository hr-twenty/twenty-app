angular.module('app.cards', [])

  // This filter reverses the order of cards array for ng-repeat so that they display in the correct order
  .filter('reverse', function() {
    return function(items) {
      if (items) {
        return items.slice().reverse();
      }
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

  var cardStack = [];

  // Get cards from service
  Cards.getAllCards(8, function(data) {
    cardStack = data;
    $scope.cards = cardStack.splice(0,2);
  });

  var reloadStack = function() {
    console.log('Reloading Stack');
    Cards.getAllCards(15, function(data) {
      data.forEach(function(card) {
        console.log('cardStack', cardStack);
        cardStack.push(card);
      })
    });
  }

  $scope.cardSwiped = function(index) {
    console.log(cardStack.length);
    $scope.removeCard();    
    $scope.addCard();
  };

  $scope.sendOpinion = function(userId, string) {
    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
    }
  };

  $scope.removeCard = function() {
    $scope.cards.shift();
  };

  $scope.addCard = function() {
    $scope.cards.push(cardStack.shift());
    if (cardStack.length === 5) {
      setTimeout(function() {
        reloadStack();
      }, 4000);
    }
  };

  $scope.rejectCard = function(userId) {
    console.log('clicked rejectCard button', userId);
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    // card.swipe();
  };

  $scope.approveCard = function(card) {
    console.log('Clicked approveCard button', card);
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  // goAway function is for button clicks
  $scope.goAway = function() {
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    // card.swipe();
  };
});











