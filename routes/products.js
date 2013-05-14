
function toSlug(text, options){
  return text.replace(/[^a-zA-z0-9_]+/g, '-')
}

exports.list = function(req, res) { 
  db.collection('products').find().toArray(function(err, products) {
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

