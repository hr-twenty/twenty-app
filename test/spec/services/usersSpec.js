describe('users service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('Users'); 
  }));

  it('has interface methods', function(){
    expect(typeof service.getUserInfoFromStorage).toBe('function');
    expect(typeof service.getUserInfo).toBe('function');
    expect(typeof service.deleteAccount).toBe('function');
    expect(typeof service.setCurrentUserId).toBe('function');
    expect(typeof service.currentUserId).toBe('function');
    expect(typeof service.currentUserData).toBe('function');
  });
});
