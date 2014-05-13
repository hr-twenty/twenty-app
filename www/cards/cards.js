angular.module('app.cards', [])

/**  This is the controller for the full deck.  */
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', 'Cards', 'LocalStorage', function($scope, $ionicSwipeCardDelegate, Cards, LocalStorage) {

  $scope.cards = Cards.cardStack;

  $scope.removeCard = function() {
    console.log('$scope.removeCard. $scope.cards before removal: ', $scope.cards, $scope.cards.length);
    Cards.cardStack.pop();
    console.log('$scope.removeCard. $scope.cards after removal: ', $scope.cards, $scope.cards.length);
    console.log('scopeCards Last', $scope.cards[0].userId);
    console.log('stack Last', Cards.cardStack[0].userId);
    console.log('cardStackLength', Cards.cardStack.length);

    LocalStorage.writeCardsToLocal($scope.cards);
    if (Cards.cardStack.length === 5) {
      Cards.reloadStack(function(){
        $scope.cards = Cards.cardStack;
      });
    } 
  };

  $scope.sendOpinion = function(userId, string) {
    console.log('sendOpinion', string);

    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
    }
    setTimeout(function(){
      $scope.removeCard();  
    }, 400);
  };

  $scope.rejectCard = function() {
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
// .filter('reverse', function() {
//   return function(items) {
//     if (items) {
//       return items.slice().reverse();
//     }
//   };
// })

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











