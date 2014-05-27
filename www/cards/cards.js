angular.module('app.cards', [])

/**  This is the controller for the full deck.  */
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', 'LocalStorage', function($scope, $ionicSwipeCardDelegate, Cards, LocalStorage) {

  // Save the cards current on the scope when navigating away
  $scope.$on('$destroy', function() {
    Cards.cardsInScope = $scope.cards;
  });

  if(Cards.cardsInScope) {
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
    // LocalStorage.writeScopeCardsToLocal($scope.cards);
    Cards.cardsInScope = $scope.cards.length;
  };

  $scope.addCard = function() {
    //If we have cards available in the card stack, add one
    if (Cards.cardStack.length > 0) {
      $scope.cards.push(Cards.cardStack.shift());
      // LocalStorage.writeScopeCardsToLocal($scope.cards);
      // Cards.cardsInScope = $scope.cards.length;
      LocalStorage.writeCardsToLocal(Cards.cardStack);
      if (Cards.cardStack.length === 5) {
        Cards.reloadStack();
      }
    //Otherwise, update cards in scope when available
    } else {
      $scope.reloadScopeCards();
    }
  };

  $scope.reloadScopeCards = function(timesCalled){
    timesCalled = timesCalled || 0;
    if(Cards.cardStack.length > 1) {
      $scope.cards = Cards.cardStack.splice(0,2);
    } else {
      setTimeout(function(){
        $scope.reloadScopeCards(timesCalled);
      }, 3000);
    }
    if(timesCalled>3){
      Cards.reloadStack();
    }
    timesCalled++;
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











