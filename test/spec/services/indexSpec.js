describe('service index', function(){
  var injector;

  beforeEach(module('app.services'));

  beforeEach(inject(function($injector){
    injector = $injector; 
  }));

  it("should contain Backend service through dependency", function() {
    expect(injector.get('Backend'));
  });

  it("should contain Cards service through dependency", function() {
    expect(injector.get('Cards'));
  });

  it("should contain LocalStorage service through dependency", function() {
    expect(injector.get('LocalStorage'));
  });

  it("should contain Users service through dependency", function() {
    expect(injector.get('Users'));
  });

  it("should contain Messages service through dependency", function() {
    expect(injector.get('Messages'));
  });
});
