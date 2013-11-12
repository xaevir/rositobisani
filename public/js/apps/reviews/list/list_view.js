define([ 
  'hbs!apps/reviews/templates/review',
  'Handlebars',
  'hbs!apps/reviews/templates/composite',
], function(tpl, Handlebars, compositeTpl){
  'use strict';

  Handlebars.registerHelper('genStars', genStars);

  function genStars (num) {
    var str = ''
    for (var i=0; i<num; i++) {
      str += '&#9733;'
    }
    return new Handlebars.SafeString(str)
  }

  var Review = Marionette.ItemView.extend({
    template: tpl,
    tagName: "li"
  });

  return Backbone.Marionette.CompositeView.extend({
    
    className: 'reviewContent',

    template: compositeTpl,

    itemView: Review,

    itemViewContainer: 'ul'
  })

});
