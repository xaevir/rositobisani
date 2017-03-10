var fs = require('fs');
var imagemagick = require('imagemagick');

function toSlug(text, options){
  return text.replace(/[^a-zA-z0-9_]+/g, '-')
}

exports.list = function(req, res) {
  db.collection('manuals').find().toArray(function(err, manuals) {
    res.send(manuals);
  })
}

exports.sortedList = function(req, res) {

  db.collection('manuals').find().sort({title: 1}).toArray(function(err, manuals) {
    db.collection('categories').find().toArray(function(err, categories) {
      _.each(manuals, function(manual){
        var catBelongsIn = _.find(categories, function(category){
          return manual.category == category._id.toString()
        })
        if (typeof catBelongsIn.manuals === "undefined")
          catBelongsIn.manuals = []
        catBelongsIn.manuals.push(manual)
      })

      var parents = []
      var children = []
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
  })
}

exports.newSortedList = function(req, res) {

  db.collection('manuals').find().sort({order: 1}).toArray(function(err, manuals) {
    db.collection('categories_manuals').find().toArray(function(err, categories) {

      var data = manuals.concat(categories);


      // create a name: node map
      var dataMap = data.reduce(function(map, node) {
        map[node._id] = node;
        return map;
      }, {});

      // create the tree array
      var tree = [];
      data.forEach(function(node) {
          // add to parent
          var parent = dataMap[node.parent];
          if (parent) {
              // create child array if it doesn't exist
              (parent.children || (parent.children = []))
                  // add node to child array
                  .push(node);
          } else {
              // parent is null or missing
              tree.push(node);
          }
      });

      //add depth property and leaf
      function iterate(current, depth) {
          current.depth = depth;
          var children = current.children || 0;
          if (!children) current.leaf = true;
          for (var i = 0, len = children.length; i < len; i++) {
              iterate(children[i], depth + 1);
          }
      };

      tree.forEach(function(node) {
          iterate(node, 0);
      });

      // remove all categories that dont have manuals
      tree = _.filter(tree, function(node) {
      		return node.depth === 0 && node.children !== undefined;
      });

      var text = '<div class="container"><h1>User Manuals &amp; Parts</h1><div class="body">';


      function printTree(tree) {

        tree.forEach(function(node) {
            // set the html wrapper
        		if (!node.leaf) {
              // dont start at 0
              var lvl = node.depth + 2;
            	text += '<h'+ lvl + '>' + node.name + '</h' + lvl + '>';
            }
            else {
              text += `<li><a href="/img/manuals/${node.fileName}">
                <div class="thumbnail">
                  <img alt="${node.name}" src="/img/manuals/${node.thumb}"/>
                </div>
                <div class="title">${node.name}</div>
              </a></li>`;
            }
            // add ul wrapper if children leaves
            if (node['children'] && node['children'][0]['leaf'])  text += '<ul class="item-rows">'

            if (node['children']) {
                printTree(node['children']);
            }

            if (node['children'] && node['children'][0]['leaf'])  text += '</ul>'
        });

      }

      printTree(tree);

      text += '</div></div>';

      res.send(text);

    })
  })
}


exports.getOne = function(req, res) {
    db.collection('manuals').findOne({_id: db.ObjectID(req.params.id)}, function(err, manual){
    res.send(manual);
  })
}

exports.create = function(req, res) {
  db.collection('manuals').insert(req.body, function(err, result){
    var manual = result[0]
    res.send(manual)
  })
}

exports.update = function(req, res) {
  req.body.slug = toSlug(req.body.title)
  req.body._id = db.ObjectID(req.body._id)
  db.collection('manuals').save(req.body, function (err, result) {
    var manual = result[0]
    res.send(manual)
  })
}

exports.remove = function(req, res) {
  db.collection('manuals').findOne({'_id': db.ObjectID(req.params.id)}, function(err, manual){
    if (err) throw err;
    removeFile(mediaBasePath+'img/manuals/'+ manual.thumb, manual.thumb, function(){
      removeFile(mediaBasePath+'img/manuals/'+ manual.fileName, manual.fileName, function(){
        db.collection('manuals').remove({'_id': db.ObjectID(req.params.id)}, function(err, result){
          if (err) throw err;
          doneRemoving(res, req.params.id)
        })
      })
    })
  })
}

function removeFile(file, name, func){
  fs.unlink(file, function (err) {
    if (err) throw err;
    console.log('successfully deleted '+ name);
    func()
  });
}

function doneRemoving(res, name) {
  res.send({
    success: true,
    message: 'file removed',
  })
}


function splitFilename(filename){
  var regex = /^(.+)\.([a-zA-Z]+)/
  var match = regex.exec(filename);
  var name = match[1]
  var extension = match[2]
  return {name: name, extension: extension}
}

function toSlugFile(filename){
  var split = splitFilename(filename)
  name = toSlug(split.name)
  extension = split.extension.toLowerCase()
  return name+'.'+extension
}

exports.upload = function(req, res) {
  for(var params in req.query){
    params = JSON.parse(params);
    break
  }
  var manualTitle = params.title
  var manualCategory = params.category
  req.files.file.name = toSlugFile(req.files.file.name)
  var file = req.files.file
  var regex = /^(.+)\.([a-zA-Z]+)/
  var match = regex.exec(file.name);
  var nameNoExt = match[1]
  var extension = match[2]

  var thumbName = nameNoExt+'_thumb_pdf.png'
  var mediumName = nameNoExt+'_medium_pdf.png'
  var mediumSize = '300x400>'
  var thumbnailSize = '175x155>'
  var pathOnServer = mediaBasePath+'/img/manuals/'
  req.body = {
    fileName: file.name,
    thumb: thumbName,
    title: manualTitle,
    category: manualCategory
  }
  createThumb(file.path+'[0]', thumbnailSize, pathOnServer+thumbName, function(){
    savePdf(file.path, pathOnServer+file.name, function(){
      exports.create(req, res)
    })
  })
}

function createThumb(input, size, output, func){
  var options = [input, '-resize', size, '-quality', '100', output]
  imagemagick.convert(options, function(err, metadata){
    if(err) throw err;
    console.log('image thumbnail created and saved')
    func()
  })
}

function savePdf(input, output, func){
  fs.rename(input, output, function(err) {
    if(err) throw err;
    console.log('pdf saved')
    func()
  })
}
