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
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', 'LocalStorage', function($scope, $ionicSwipeCardDelegate, Cards, LocalStorage) {

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
    console.log('calling addCard', Cards.cardStack.length)
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
    var timesCalled = timesCalled || 0;
    if(Cards.cardStack.length > 1) {
      $scope.cards = Cards.cardStack.splice(0,2);
    } else {
      //if there are no cards in the stack, call this function again in 3 seconds
      setTimeout(function(){
        $scope.reloadScopeCards(timesCalled);
      }, 3000);
      //If we've called this function 3 times, reload the stack again
      if(++timesCalled >= 3){
        Cards.reloadStack();
      }
    }
  }

  $scope.sendOpinion = function(userId, string) {
    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
    }
  };

  $scope.rejectCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    scopeCard.swipe('left');
  };

  $scope.approveCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    scopeCard.swipe('right');
  };


  $scope.deckIsEmpty = function() {
    if($scope.cards.length <= 1) {
      return true;
    } else {
      return false;
    }
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {

});











