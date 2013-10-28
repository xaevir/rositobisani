define([ 
  'appMarionette',
], function(App){


  var Child = Backbone.Model.extend({idAttribute: '_id'});

  var Children = Backbone.Collection.extend({ model: Child });

  var Category = Backbone.Model.extend({ 

    idAttribute: "_id", 

    urlRoot: "/categories",

    initialize: function(){
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);
    }
  });

  var Categories = Backbone.Collection.extend({

    model: Category,

    url: '/categories',

    initialize: function(){
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
    }
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
    },
    getOne: function(id){
      var category = new Category({_id: id});
      var defer = $.Deferred();
      category.fetch({
        success: function(data){
          defer.resolve(category);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },
  }

  App.reqres.setHandler("category:entities", function(){
    return API.getCategoryEntities();
  });

  App.reqres.setHandler("category:entity", function(id){
    return API.getOne(id);
  });


  //return Categories;
});
