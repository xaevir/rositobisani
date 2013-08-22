define([ 
  'appMarionette',
], function(App){

  var Manual = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot: "manuals",
    isNew: function(){
      return this.get('filename') == null
    },
    url : function() {
      var base = '/manuals/'
      if (this.isNew()) return base;
      return base + this.get('filename');
    },
    validation: {
      category: {required: true},
      name: {required: true},
      subcategory: {required: function(){
        var currentCat = this.get('category')
        var hasSubCats = _.find(this.cats, function(cat){ 
          return cat.name == currentCat && cat.subcategories
        });
        if (hasSubCats) return true
      }},
    },
  });

  var API = {
    getOne: function(id){
      var manual = new Manual({id: id});
      var defer = $.Deferred();
      manual.fetch({
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

  App.reqres.setHandler("manual:entity", function(id){
    return API.getOne(id);
  });

  return Manual;
});
