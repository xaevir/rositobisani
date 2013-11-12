define([ 
  'appMarionette',
  'entities/review_items',
], function(App, reviewItems){

  var _private = {}

  var Review = Backbone.Model.extend()

  var Reviews = Backbone.Collection.extend({
    model: Review
  });

  var initializeReviews = function(){
    _private.reviews = new Reviews(reviewItems);
  };

  var API = {
    getReviews: function(){
      if(_private.reviews === undefined){
        initializeReviews();
      }
      return _private.reviews;
    }
  };

  App.reqres.setHandler("review:entities", function(){
    return API.getReviews();
  });
});
