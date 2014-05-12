describe('Connections service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('Connections'); 
  }));

  it('has interface methods', function(){
    expect(typeof service.logPotentialConnections).toBe('function');
    expect(typeof service.on).toBe('function');
    expect(typeof service.notify).toBe('function');
    expect(typeof service.checkNewConnections).toBe('function');
    
    expect(typeof service.currentConnection).toBe('object');
  });

});