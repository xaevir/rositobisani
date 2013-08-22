define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/editable_list/editable_list_view',
  'entities/filteredCollection',
], function(App, Loading, EditableListView, FilteredCollection){
  
  return function(regionView){
    var loadingView = new Loading();
    regionView.show(loadingView)
    
    var fetchingManuals = App.request("manual:entities");
    var initialCriteriaCategory = '51db047ebaea90738a903c1d'

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

      var editableListView = new EditableListView({
        collection: filteredManuals
      });

      editableListView.on("itemview:manual:edit", function(view, manual) {
        App.trigger("manual:edit", manual)
      })

      App.on("category:selected", function(filtercriterion){
        filteredManuals.filter(filtercriterion);
      });

      filteredManuals.filter(initialCriteriaCategory);

      regionView.show(editableListView);
    });
  }
});
