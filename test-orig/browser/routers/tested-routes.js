//var expect = chai.expect;
//var AppRouter = Backbone.Router.extend();

define(function(require) {

  var AppRouter = require('js/router.js')

  describe("AppRouter routes", function() {
    beforeEach(function() {
      this.router = new AppRouter;
      this.routeSpy = sinon.spy();
      try {
        Backbone.history.start({silent:true, pushState:true});
      } catch(e) {}
      this.router.navigate("elsewhere");
    });
    
    it("fires the index route with a blank hash", function() {
      this.router.bind("route:index", this.routeSpy);
      this.router.navigate("", true);
      expect(this.routeSpy).to.be.calledOnce;
    });
  });
});
