define([ 
  'hbs!apps/manuals/templates/layout',
], function(layoutTpl){
 
  var View = {}
  View.Layout = Marionette.Layout.extend({
    template: layoutTpl, 
    regions: {
      categoriesRegion: '#categories-region',
      manualsRegion: '#manuals-region'
    }
  })
  
  return View
});
