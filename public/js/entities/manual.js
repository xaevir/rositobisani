define([ 
  'appMarionette',
], function(App){

  var Manual = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot: "/manuals",
    validation: {
      category: {required: true},
      title: {required: true},
      file: {required: true},
      /*subcategory: {required: function(){
        var currentCat = this.get('category')
        var hasSubCats = _.find(this.cats, function(cat){ 
          return cat.name == currentCat && cat.subcategories
        });
        if (hasSubCats) return true
      }},
      */
    },
  });

  var API = {
    getOne: function(id){
      var manual = new Manual({_id: id});
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
