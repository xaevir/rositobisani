define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/list/list_view',
  'apps/manuals/list/edit_list_view',
  'entities/filteredCollection',
], function(App, Loading, ListView, EditListView, FilteredCollection){
  return {
    listManuals: function(view){
      var loadingView = new Loading();
      App.mainRegion.show(loadingView);
        
      var fetchingManuals = App.request("manual:entities");
      
      $.when(fetchingManuals).done(function(manuals){
        var manualsListView = new ListView.Manuals({
          collection: manuals
        });

        manualsListView.on("itemview:manual:delete", function(childView, model){
          model.destroy();
        });
        if (view)
          view.show(manualsListView)
        else
          App.mainRegion.show(manualsListView);
      });
    },
    manualsByCategoryEdit: function(id){
      var loadingView = new Loading();
      App.manualsRegion.show(loadingView)
      
      var fetchingManuals = App.request("manual:entities");

      $.when(fetchingManuals).done(function(manuals){
        var filteredManuals = FilteredCollection({
          collection: manuals,
          filterFunction: function(filterCriterion){
            return function(manual){
              if(manual.get('category') === filterCriterion)
                return manual;
              }
            }
          })

        var editListView = new EditListView({
          collection: filteredManuals
        });


        App.on("category:selected", function(filterCriterion){
          filteredManuals.filter(filterCriterion);
          //ContactManager.trigger("contacts:filter", filterCriterion);
        });

        filteredManuals.filter('51db047ebaea90738a903c1d');

        App.manualsRegion.show(editListView);
      });
    }
  }
});
