angular.module('app.cards', [])

/**  This is the controller for the full deck.  */
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', 'LocalStorage', function($scope, $ionicSwipeCardDelegate, Cards, LocalStorage) {
  
  // ping for more cards if none on stack
  $scope.checkEmptyStack = function() {
    console.log('Checking Empty Stack');
    if (Cards.cardStack.length <= 1) {
      if ($scope.cards) {
        Cards.cardsInScope = $scope.cards;
      }
      Cards.reloadStack();
      setTimeout(function() {
        if (Cards.cardStack.length > 1) {
          console.log('Splicing cards onto scope');
          $scope.cards = Cards.cardStack.splice(0,2);
        }
      }, 2000);
      setTimeout(function() {
        $scope.checkEmptyStack();
      }, 3000);
    }
  }
  $scope.checkEmptyStack();

  $scope.$on('$destroy', function() {
    Cards.cardsInScope = $scope.cards;
  });

  if(Cards.cardsInScope.length === 2) {
    $scope.cards = Cards.cardsInScope;
    Cards.cardsInScope = [];
  } else {
    $scope.cards = Cards.cardStack.splice(0,2);
  }

  $scope.cardSwiped = function(index) {
    $scope.removeCard();  
    $scope.addCard();
  };

  $scope.removeCard = function() {
    $scope.cards.shift();
  };

  $scope.addCard = function() {
    if (Cards.cardStack.length > 0) {
      $scope.cards.push(Cards.cardStack.shift());
      LocalStorage.writeCardsToLocal(Cards.cardStack);
      if (Cards.cardStack.length === 5) {
        Cards.cardsInScope = $scope.cards;
        Cards.reloadStack();
      }
    } else {
      $scope.checkEmptyStack();
    }
  };

  $scope.sendOpinion = function(userId, string) {
    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
    }
  };

  $scope.rejectCard = function() {
    // need to check for both cards on the scope for the edge case
    var scopeCard;
    var base = $scope.$$childHead.$$nextSibling;
    if(base.$$childHead.$$nextSibling.$$nextSibling) {
      scopeCard = base.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    } else {
      scopeCard = base.$$childTail.swipeCard;
    }
    scopeCard.swipe('left');
  };

  $scope.approveCard = function() {
    // need to check for both cards on the scope for the edge case -- get ready for some traversal
    var scopeCard;
    var base = $scope.$$childHead.$$nextSibling;
    if(base.$$childHead.$$nextSibling.$$nextSibling) {
      scopeCard = base.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    } else {
      scopeCard = base.$$childTail.swipeCard;
    }
    scopeCard.swipe('right');
  };

  $scope.deckIsEmpty = function() {
    return $scope.cards.length === 0 ? true : false;
  };

}])

// This filter reverses the order of cards array for ng-repeat so that they display in the correct order
.filter('reverse', function() {
  return function(items) {
    if (items) {
      return items.slice().reverse();
    }
  };
})

// Ensures that card swiping won't scroll the screen
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

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {

});











