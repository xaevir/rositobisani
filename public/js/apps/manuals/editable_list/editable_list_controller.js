define([
  'appMarionette',
  'apps/manuals/editable_list/editable_list_view',
  'entities/filteredCollection',
  'apps/manuals/edit/edit_view',
  'apps/manuals/show/show_view',
  'apps/common/alert',
  'entities/manual',
  'apps/manuals/new/new_view',
], function(App, EditableListView, FilteredCollection, EditView, ShowView, AlertView, ManualModel, NewManualView){

  return {

    listByCat: function(catId){

      this.catId = catId

      this.regionView.show(new Loading())

      var fetchingManuals = this.getAllManuals()

      var fetchingCategory = App.request("category:entity", this.catId);

      var self = this

      $.when(fetchingManuals, fetchingCategory).done(function(manuals, category) {

        self.categoryModel = category

        self.setupViewEvents()

        self.filteredCollection.filter(self.catId);

        self.regionView.show(self.manualsListLayout);
      })
    },

    listByManualId: function(manualId){

      this.manualId = manualId

      this.regionView.show(new Loading())

      var promise = this.getAllManuals()

      $.when(promise).done(function(value) {
        this.setupViewEvents()

        this.model = this.filteredCollection.get(this.manualId)

        this.catId = this.model.get('category')

        var self = this

        this.manualsListView.on('show', function() {
          if (self.model)
            self.manualsListView.trigger("itemview:manual:edit", self.model.view, self.model)
          else
            App.dialogRegion.show(new ShowView.MissingManual())
        })

        this.filteredCollection.filter(self.catId);

        this.regionView.show(this.manualsListView);
      })
    },


    getAllManuals: function(){

      var self = this

      if (!this.rawCollection) {

        var fetchingManuals = App.request("manual:entities");

        $.when(fetchingManuals).done(function(manuals){
          self.rawCollection = manuals
          self.filteredCollection = FilteredCollection({
            collection: manuals,
            filterFunction: function(filterCriterion){
              return function(manual){
                if(manual.get('category') === filterCriterion)
                  return manual;
              }
            }
          })
          deferred.resolve(self.filteredCollection);
        })
      }
      else {
        setTimeout(function(){
          deferred.resolve(self.filteredCollection);
        }, 0);
      }

      var deferred = $.Deferred();

      return deferred.promise();
    },

    setupViewEvents: function() {

      this.manualsListLayout = new EditableListView.Layout()

      this.manualsListPanel = new EditableListView.Panel({
        model: this.categoryModel
      })

      this.manualsListView = new EditableListView.Manuals({
        collection: this.filteredCollection
      });

      var self = this

      this.manualsListLayout.on("show", function(){
        self.manualsListLayout.panelRegion.show(self.manualsListPanel)
        self.manualsListLayout.manualsRegion.show(self.manualsListView)
      })

      this.manualsListPanel.on('manual:new', function(){
        var newManual = new ManualModel()
        newManual.set('category', self.catId)

        var newManualView = new NewManualView({
          model: newManual
        })

        Backbone.Validation.bind(newManualView);

        newManualView.on('form:success', function(newManual){
          self.rawCollection.add(newManual)
          App.dialogRegion.close() //this should be in view?

          self.manualsListView.children.findByModel(newManual).flash('alert-success')

          var alertView = new AlertView({message: 'New Manual Created'})
          App.alertRegion.show(alertView);

          App.navigate("admin/manuals/category/" + newManual.get('category'));

        })

        App.dialogRegion.show(newManualView)

      })

      this.manualsListView.on("itemview:contact:delete", function(childView, model){
        model.destroy();
      });

      this.manualsListView.on("itemview:manual:edit", function(childView, model) {
        var editView = new EditView({
          model: model
        })

        Backbone.Validation.bind(editView);

        editView.on("form:submit", function(data){
          if(model.save(data)){
            childView.render()
            App.dialogRegion.close() //this should be in view?

            childView.flash('alert-success')

            var alertView = new AlertView()
            App.alertRegion.show(alertView);

            App.navigate("admin/manuals/category/" + model.get('category'));
          }
        });

        App.dialogRegion.show(editView)

        App.navigate("admin/manuals/" + model.id + "/edit");
      })
    }
  };
});
