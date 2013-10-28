define([ 
  'appMarionette',
  'apps/reale/show/show_view',
], function(App, ShowView){
  return {
    showReale: function(tab) {
      $.get('/products/reale', function(obj) {

        var showView = new ShowView({template: obj.body})

        document.title = obj.title

        showView.on('show', function() {
          if (tab)
            showView.triggerMethod('load:tab', tab)

          App.trigger("reviews:list", showView.reviewsRegion)
        })

        App.mainRegion.show(showView);
      })
    }
  }
});
