define(function(require) {
  var Model = require('models/contact')

  describe("Contact Model", function(){
    beforeEach(function() {
      this.model = new Model();
      this.view = new Backbone.View({model: this.model});
      this.invalid = sinon.spy();
      Backbone.Validation.bind(this.view, {
        invalid: this.invalid
      });
    })

    describe("Validation", function() {
      it("should return 'required' for 'name' attribute", function() {
        this.model.save({name: ''});
        this.invalid.should.have.been.calledOnce
        this.invalid.should.have.been.calledWith(this.view, 'name', 'required');
      })
      it("should return 'required' for 'email' attribute", function() {
        this.model.save({email: ''});
        this.invalid.should.have.been.calledOnce
        this.invalid.should.have.been.calledWith(this.view, 'email', 'required');
      })
      it("should return proper msg for 'email pattern' attribute", function() {
        this.model.save({email: 'a'});
        this.invalid.should.have.been.calledOnce
        this.invalid.should.have.been.calledWith(
          this.view, 
          'email', 
          'Please enter a valid email');
      })
      it("should return 'required' for 'message' attribute", function() {
        this.model.save({message: ''});
        this.invalid.should.have.been.calledOnce
        this.invalid.should.have.been.calledWith(this.view, 'message', 'required');
      })
    })
  })
})
