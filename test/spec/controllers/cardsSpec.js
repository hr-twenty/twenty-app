describe('card controller', function(){
  
  beforeEach(module('twenty'));

  var controller, scope, rootScope;

  beforeEach(inject(function($injector, $controller) {
    // Angular objects
    var ctrl = $injector.get('$controller');
    rootScope = $injector.get('$rootScope');

    // Test objects
    scope = rootScope.$new();
    controller = ctrl('CardsCtrl', {
      $scope: scope,
      $ionicSwipeCardDelegate: $injector.get('$ionicSwipeCardDelegate'), 
      Cards: $injector.get('Cards')
    });
  }));

  it('should contain some cards', function(){
    expect(scope.cards.length).toBeGreaterThan(0);
  })

  it('should swip cards', function(){
    scope.cardSwiped();
  })

  it('should remove card', function(){
    var original = scope.cards.length;
    scope.removeCard();
    expect(scope.cards.length).toBeLessThan(original);
  })

  it('should add card', function(){
    var original = scope.cards.length;
    scope.removeCard();
    expect(scope.cards.length).toBeGreaterThan(original);
  })

  describe('swiping', function(){
    beforeEach(function(){
      spyOn(scope, 'acceptUser').andCallThrough();
      spyOn(scope, 'rejectUser').andCallThrough();
    })

    afterEach(function(){
      scope.acceptUser.reset();
      scope.rejectUser.reset();
    })

    it('should swipe left on accept', function(){
      scope.sendOpinion(1, 'left');
      expect(scope.acceptUser.callcount).toEqual(1);
      expect(scope.rejectUser.callcount).toEqual(0);
    });

    it('should swipe right on reject', function(){
      scope.sendOpinion(1, 'right');
      expect(scope.acceptUser.callcount).toEqual(0);
      expect(scope.rejectUser.callcount).toEqual(1);
    });
  });

});
/*

  $scope.sendOpinion = function(userId, string) {
    if(string === 'right') {
      Cards.acceptUser(userId);
    } else if (string === 'left') {
      Cards.rejectUser(userId);
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
  */