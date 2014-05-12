describe('main service', function(){

  describe('users', function(){
    var service;

    beforeEach(module('twenty'));

    beforeEach(inject(function($injector){
      service = $injector.get('Users'); 
    }));

    it('has a bunch of methods', function(){
      expect(typeof service.getUserInfoFromStorage).toBe('function');
      expect(typeof service.getUserInfo).toBe('function');
      expect(typeof service.deleteAccount).toBe('function');
      expect(typeof service.setCurrentUserId).toBe('function');
      expect(typeof service.currentUserId).toBe('function');
      expect(typeof service.currentUserData).toBe('function');
    });
  });

  describe('StateControl', function(){
    var service;

    beforeEach(module('app.services'));

    beforeEach(inject(function($injector){
      service = $injector.get('StateControl'); 
    }));

    it('has a bunch of methods', function(){
      expect(typeof service.toggleMenuByState).toBe('function');
      expect(typeof service.goBackWithState).toBe('function');
      expect(typeof service.scrollToBottom).toBe('function');
    });
  });

});
