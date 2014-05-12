describe('messages service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('Messages'); 
  }));

  it('has interface methods', function(){
    expect(typeof service.sendMessage).toBe('function');
    expect(typeof service.addOneConversationToStorage).toBe('function');
    expect(typeof service.getAllMessages).toBe('function');
    expect(typeof service.oneConversation).toBe('function');
    expect(typeof service.getOneMessage).toBe('function');
    expect(typeof service.updateRegularly).toBe('function');
    expect(typeof service.initialize).toBe('function');
  });

});
