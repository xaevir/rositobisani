define([ 
  'hbs!apps/reale/templates/index',
], function(tpl){
  
  return Marionette.ItemView.extend({
    template: tpl
  });
});
