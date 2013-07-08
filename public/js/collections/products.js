define(function(require) {
  var Product = require('models/product')
  
  return Backbone.Collection.extend({

    model: Product,

    url : 'products',

    categories :  [
      {slug: 'espresso-machines', name: 'Espresso Machines',
        subcategories: [
          {slug: 'royal', name: 'Royal'}, 
          {slug: 'synesso', name: 'Synesso'},
          {slug: 'reale', name: 'Reale'},
          {slug: 'schaerer', name: 'Schaerer'}
        ] 
      }, 
      {slug: 'espresso-grinders', name: 'Espresso Grinders'}, 
      {slug: 'juicers', name: 'Juicers'}, 
      {slug: 'panini-grills', name: 'Panini Grills'},
      {slug: 'gelato', name: 'Gelato'},
      {slug: 'pizza-ovens', name: 'Pizza Ovens'},
      {slug: 'pasta-machines', name: 'Pasta Machines'},
      {slug: 'meat-slicers', name: 'Meat Slicers'},
      {slug: 'hot-chocolate', name: 'Hot Chocolate'},
      {slug: 'mixers', name: 'Mixers'},
     ],
    
    subcategories: [
      {slug: 'royal', name: 'Royal'}, 
      {slug: 'synesso', name: 'Synesso'},
      {slug: 'reale', name: 'Reale'},
      {slug: 'schaerer', name: 'Schaerer'}
    ] 

  })
})
