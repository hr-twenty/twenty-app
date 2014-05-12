describe('backend service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('Backend'); 
  }));

  it('has interface methods', function(){
    expect(service.dbHost).toBeDefined();
    expect(typeof service.get).toBe('function');
    expect(typeof service.post).toBe('function');
    expect(typeof service.del).toBe('function');
  })

});
