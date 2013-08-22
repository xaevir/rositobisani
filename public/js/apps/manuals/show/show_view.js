define([ 
  'hbs!apps/manuals/templates/nonexistent',
], function(tpl){
  
  var Show = {}

  Show.MissingManual = Marionette.ItemView.extend({
    template: tpl
  });
  return Show 
});
