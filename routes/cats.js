function toSlug(text, options){
  return text.replace(/[^a-zA-z0-9_]+/g, '-')
}

exports.test = function(req, res) { 
  var dir = process.cwd()
  req.app.set('views', dir + '/public/js/fileUpload');
  res.render('layout');
  req.app.set('views', dir + '/views');
}

exports.list = function(req, res) { 
  db.collection('products').find().sort({order: 1}).toArray(function(err, products) {
    res.send(products);
  })
}
