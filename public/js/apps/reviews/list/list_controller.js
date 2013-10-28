define([ 
  'appMarionette',
  'apps/reviews/list/list_view',
], function(App, ListReviews){

  return {
    listReviews: function(regionView){

      var collection = App.request("review:entities");

      var listReviews = new ListReviews({ collection: collection });

      regionView.show(listReviews);

    }
  }
});
