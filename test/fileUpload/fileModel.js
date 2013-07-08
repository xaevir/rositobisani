define(function(require) {
  var Model = require('fileUpload/fileModel')

  describe("FileUpload Model", function(){
    beforeEach(function() {
      this.model = new Model();
    })

    describe("Defaults", function() {
      it("should set the default values", function() {
        this.model.get('name').should.exist;
        this.model.get('type').should.exist;
        this.model.get('medium').should.exist;
        this.model.get('thumb').should.exist;
      })
    })
  })
})
