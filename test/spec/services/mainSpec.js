describe('main service', function(){

  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('StateControl'); 
  }));

  it('has interface methods', function(){
    expect(typeof service.toggleMenuByState).toBe('function');
    expect(typeof service.goBackWithState).toBe('function');
    expect(typeof service.scrollToBottom).toBe('function');
  });
});
