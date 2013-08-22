define([ 
  'appMarionette',
], function(App){


  var Child = Backbone.Model.extend({idAttribute: '_id'});

  var Children = Backbone.Collection.extend({ model: Child });

  var Category = Backbone.Model.extend({ idAttribute: "_id", });

  var Categories = Backbone.Collection.extend({
    model: Category,
    url: '/categories'
  });

  var API = {
    getCategoryEntities: function(){
      var categories = new Categories();
      var defer = $.Deferred();
      categories.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(categories){
        categories.each(function(category){
          var childrenArray = category.get('children');
          var childrenCollection = new Children(childrenArray);
          category.set('children', childrenCollection);
        });
      });
      return promise;
    }
  }

  App.reqres.setHandler("category:entities", function(){
    return API.getCategoryEntities();
  });

  //return Categories;
});
