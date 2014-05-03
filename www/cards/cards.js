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
  // TODO: Fix this!! Cards.cardStack is getting spliced every time the controller loads.
  // We ONLY want it to load the first time.
  $scope.cards = Cards.cardStack.splice(0,2);

  // var reloadStack = function() {
  //   console.log('Reloading Stack');
  //   Cards.getAllCards(function(data) {
  //     data.forEach(function(card) {
  //       console.log('Cards.cardStack', Cards.cardStack);
  //       Cards.cardStack.push(card);
  //     })
  //   });
  // }

  $scope.cardSwiped = function(index) {
    // console.log('Cards in cards', Cards.cardStack.length);
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
    $scope.cards.push(Cards.cardStack.shift());
    if (Cards.cardStack.length === 5) {
      setTimeout(function() {
        // 4 sec timeout gives server time to process card approve/reject before loading new cards
        // console.log('Calling reloadStack from cards CTRL')
        Cards.reloadStack();
      }, 4000);
    }
  };

  $scope.rejectCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    // console.log('clicked rejectCard button', scopeCard);
    // console.log('REJECT BUTTON USER ID: ', userId);
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    scopeCard.swipe('left');
  };

  $scope.approveCard = function() {
    var scopeCard = $scope.$$childHead.$$nextSibling.$$childHead.$$nextSibling.$$nextSibling.swipeCard;
    // console.log('Clicked approveCard button', scopeCard);
    // console.log('ACCEPT BUTTON USER ID: ', userId);
    // var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    scopeCard.swipe('right');
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  // goAway function is for button clicks
  // $scope.goAway = function() {
  //   console.log('Calling Go Away');
  //   var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
  //   console.log('card from GOAWAY: ', card);
  //   card.swipe();
  // };
});











