define([ 
  'appMarionette',
  'entities/files',
], function(App, Files){

  var Product = Backbone.Model.extend({

    idAttribute: "_id",

    urlRoot: "/products",

    isNew: function(){
      return this.get('slug') == null
    },

    initialize: function() {
      var files = new Files 
      files.parent = this
      this.set({'files': files})
      //this.set({'files': new Backbone.Collection})
      //this.files = new Files;
    },

    url : function() {
      var base = '/products/'
      if (this.isNew()) return base;
      return base + this.get('slug');
    },

    defaults: {
      name: '',
      description: '',
      category: '',
      subcategory: '',
      mainImage: '',
    },

    validation: {
      name: {required: true},
      //description: {required: true},
      category: {required: true},
    },

    parse: function(res){
      // creating from collection, this model does not get instantiated first 
      // repeating the above initialize method. Hack
      var files = new Files(res.files)
      files.parent = this
      res.files = files 
      return res
    },
  });

  var API = {
    getOne: function(id){
      var product = new Product({_id: id});
      var defer = $.Deferred();
      product.fetch({
        success: function(data){
          defer.resolve(manual);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },
  };

  App.reqres.setHandler("product:entity", function(id){
    return API.getOne(id);
  });

  return Product;
});
