var _ = require('underscore');

function toSlug(text, options){
  return text.replace(/[^a-zA-z0-9_]+/g, '-').toLowerCase()
}

exports.list = function(req, res) {
  db.collection('products').find().sort({order: 1}).toArray(function(err, products) {
    res.send(products);
  })
}

exports.create = function(req, res) {
  req.body.slug = toSlug(req.body.name)
  db.collection('products').insert(req.body, function(err, result){
    var product = result[0]
    res.send(product)
  })
}

exports.update = function(req, res) {
  // Hack: this is repeated from post action
  req.body.slug = toSlug(req.body.name)
  req.body._id = db.ObjectID.createFromHexString(req.body._id)
  db.collection('products').save(req.body, function (err, result) {
    var product = result[0]
    res.send(product)
  })
}

exports.listOne = function(req, res) {
  db.collection('products').findOne({slug: req.params.slug}, function(err, product){
    res.send(product);
  })
}

exports.sortedList = function(req, res) {

  db.collection('products').find().sort({name: 1, order:1}).toArray(function(err, products) {
    db.collection('categories').find({ show: { $exists: false } }).sort({order:1}).toArray(function(err, categories) {
      _.each(products, function(product){
        var catBelongsIn = _.find(categories, function(category){
          if (product.subcategory)
            return product.subcategory.slug == category.slug
          else
            return product.category.slug == category.slug
        })
        if (typeof catBelongsIn.products === "undefined")
          catBelongsIn.products = []
        catBelongsIn.products.push(product)
      })

      var parentCats = []
      var childCats = []
      _.each(categories, function(category){
        if (category.parent)
          childCats.push(category)
        else
          parentCats.push(category);
      });

      _.each(childCats, function(child){
        var activeParent = _.find(parentCats, function(parent){
          return _.isEqual(child.parent, parent._id);
        })
        if (typeof activeParent.children === "undefined")
          activeParent.children = []
        activeParent.children.push(child)
      })

      res.send(parentCats);
    })
  })
}



/*
exports.reale = function(req, res) {
  db.collection('products').findOne({slug: 'Reale'}, function(err, product){
    res.render('reale', product, function(err, html){
      res.send({title: 'Reale baby', body: html, model: product});
    });

  })
}
*/
