define([ 
  'appMarionette',
  'apps/reviews/list/list_controller',
], function(App, ListController ){

  App.on("reviews:list", function(view){
    ListController.listReviews(view);
  });

});
