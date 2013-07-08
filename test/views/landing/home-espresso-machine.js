define(function(require) {

  var HomeEspressoMachineView = require('views/landing/home-espresso-machine')

  describe("Home Espresso Machine View", function(){
    describe("Initialization", function() {
      beforeEach(function() {
        this.view = new HomeEspressoMachineView();
      })
      it("should default the title to an empty string",function() {
        this.view.get('title').should.equal("");
      })
    })
  })
})
