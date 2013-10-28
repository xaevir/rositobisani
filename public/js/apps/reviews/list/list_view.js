define([ 
  'hbs!apps/reviews/templates/review',
  'Handlebars'
], function(tpl, Handlebars){

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
    tagName: "li",
  });


  return Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Review,
  });

});
