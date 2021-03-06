
var _ = require('underscore')

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
  db.collection('categories').find().sort({order: 1}).toArray(function(err, categories) {
    var parents = [],
        children = []
    _.each(categories, function(category){
      if (category.parent)
        children.push(category)
      else
        parents.push(category);
    });

    _.each(children, function(child){
      var activeParent = _.find(parents, function(parent){
        return _.isEqual(child.parent, parent._id);
      })
      if (typeof activeParent.children === "undefined")
        activeParent.children = []
      activeParent.children.push(child)
    })

    res.send(parents);
  })
}

exports.getOne = function(req, res) {
  db.collection('categories').findOne({_id: db.ObjectID(req.params.id)}, function(err, category){
    res.send(category);
  })
}
