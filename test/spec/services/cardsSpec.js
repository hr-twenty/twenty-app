describe('cards service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('Cards'); 
  }));

  it('has dHost, get, post, and del', function(){
    expect(typeof service.getAllCards).toBe('function');
    expect(typeof service.reloadStack).toBe('function');
    expect(typeof service.acceptUser).toBe('function');
    expect(typeof service.rejectUser).toBe('function');
    expect(typeof service.reset).toBe('function');
  });

  it('should get some cards', function(){
    expect(service.cardStack.length).toBe(0); 
    service.getAllCards(function(){
      expect(service.cardStack.length).toBeGreaterThan(0); 
    });
  });
  
  it('should get some cards', function(){
    var original = service.cardStack.length; 
    service.reloadStack(function(err){
      expect(err).toBeFalsy();
      expect(service.cardStack.length).toBeGreaterThan(original); 
    });
  });

  it('should accept a user', function(){
    var original = service.cardStack.length; 
    service.acceptUser(function(err, success){
      expect(err).toBeFalsy();
      expect(success).toBeTruthy(); 
    });
  });

  it('should reject a user', function(){
    var original = service.cardStack.length; 
    service.rejectUser(function(err, success){
      expect(err).toBeFalsy();
      expect(success).toBeTruthy(); 
    });
  });


});
