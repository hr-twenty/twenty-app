describe('local-storage service', function(){
  var service;

  beforeEach(module('twenty'));

  beforeEach(inject(function($injector){
    service = $injector.get('LocalStorage'); 
  }));

  it('has interface methods', function(){
    expect(typeof service.getCardsFromStorage).toBe('function');
    expect(typeof service.writeCardsToLocal).toBe('function');
    expect(typeof service.hasCards).toBe('function');
    expect(typeof service.setMessageData).toBe('function');
    expect(typeof service.getMessageData).toBe('function');
    expect(typeof service.hasMessageData).toBe('function');
    expect(typeof service.setUserData).toBe('function');
    expect(typeof service.hasUserData).toBe('function');
  });

  it('should get cards from storage', function(){
    cards = service.getCardsFromStorage();
    expect(cards).toBeDefined();
  });

  it('should write cards to local', function(){
    cards = service.writeCardsToLocal();
    expect('something').toBe('happening');
  });

  it('should tell if it has cards', function(){
    //
    expect(service.hasCards()).toBe(true);
    //
    expect(service.hasCards()).toBe(false);
  })

  describe('message functions', function(){
    var msg = 'hello world';
    beforeEach(function(){
      window.localStorage.messages = undefined;
    });

    it('should recognize the lack of messages', function(){
      expect(service.hasMessageData()).toBe(false);
    });

    it('should add message and recognize the prescence of messages', function(){
      service.setMessageData([msg]);
      expect(service.hasMessageData()).toBe(true);
    });

    it('should  retrieve messages', function(){
      service.setMessageData([msg]);
      expect(service.getMessageData()[0]).toBe(msg);
    });
  });

  describe('user functions', function(){
    var data = {
      name: 'twenty'
    };
    beforeEach(function(){
      window.localStorage.user = undefined
    });

    it('should recognize the lack of user data', function(){
      expect(service.hasUserData()).toBe(false);
    });

    it('should add message and recognize the prescence of messages', function(){
      service.setUserData(data);
      expect(service.hasUserData()).toBe(true);
    });

    it('should  retrieve messages', function(){
      service.setUserData(data);
      expect(service.getUserData().name).toBe(data.name);
    });
  });
});