describe('message controller', function(){
  
  beforeEach(module('twenty'));

  describe('MessagesListCtrl', function(){}
    var makeController, scope, rootScope;

    beforeEach(inject(function($injector, $controller) {
      var ctrl = $injector.get('$controller');
      rootScope = $injector.get('$rootScope');

      makeController = function(){
        scope = rootScope.$new();
        return ctrl('MessagesListCtrl', {
          $scope: scope,
          $filter: $injector.get('$filter'), 
          $state: $injector.get('$state'), 
          Messages: $injector.get('Messages'), 
          Users: $injector.get('Users')
        });
      };
    }));

    it('should go to conversation', function(){

    })

  });

  describe('MessagesDetailsCtrl', function(){}
    var makeController, scope, rootScope;

    beforeEach(inject(function($injector, $controller) {
      var ctrl = $injector.get('$controller');
      rootScope = $injector.get('$rootScope');

      makeController = function(){
        scope = rootScope.$new();
        return ctrl('MessagesDetailsCtrl', {
          $scope: scope,
          $filter: $injector.get('$filter'), 
          $stateParams: $injector.get('$stateParams'), 
          $interval: $injector.get('$interval'), 
          Messages: $injector.get('Messages'), 
          StateControl: $injector.get('StateControl')
        });
      }
    }));

    it('should send message', function(){

    });

    it('should respond to $viewContentLoaded', function(){

    });

  });

});