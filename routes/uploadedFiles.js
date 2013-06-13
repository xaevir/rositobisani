var fs = require('fs')
    , imagemagick = require('imagemagick')

module.exports = function (app, mediaPath) {
  var module = {};

  function toSlug(text, options){
    return text.replace(/[^a-zA-z0-9_]+/g, '-')
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

  module.create = function(req, res) { 
    req.files.file.name = toSlugFile(req.files.file.name)
    var file = req.files.file
    var regex = /^(.+)\.([a-zA-Z]+)/
    var match = regex.exec(file.name);
    var nameNoExt = match[1]
    var extension = match[2]

    if (file.type == 'application/pdf') {
      var thumbName = nameNoExt+'_thumb_pdf.png'
      var mediumName = nameNoExt+'_medium_pdf.png'
      var mediumSize = '300x400>'
      var thumbnailSize = '175x155>'
      var pathOnServer = mediaBasePath+'product-pdfs/'
      var returnData = {
        name: file.name, 
        type: file.type,
        thumb: thumbName,
      }
      createThumb(file.path+'[0]', thumbnailSize, pathOnServer+thumbName, function(){
        savePdf(file.path, pathOnServer+file.name, function(){
          done(returnData, res)
        })
      })

    } else {
      var thumbName = nameNoExt+'_thumb.'+extension
      var mediumName = nameNoExt+'_medium.'+extension
      var mediumSize = '400x500>'
      var thumbnailSize = '175x155>'
      var pathOnServer = mediaBasePath+'product-images/'
      var returnData = {
        name: file.name, 
        type: file.type,
        medium: mediumName,
        thumb: thumbName,
      }
      createMedium(file.path, mediumSize, pathOnServer+mediumName, function(){
        createThumb(file.path, thumbnailSize, pathOnServer+thumbName, function(){
          removeTmp(file.path, function(){
            done(returnData, res)
          })
        }) 
      })
    }
  }

  function createMedium(input, size, output, func){
    var options = [input, '-resize', size, '-quality', '100', output ]
    imagemagick.convert(options, function(err, metadata){
      if(err) throw err;
      console.log('image resized to 400x500 and saved')
      func()
    });
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

  function removeTmp(file, func){
    fs.unlink(file, function (err) {
      if (err) throw err;
      console.log('successfully deleted tmp');
      func()
    });
  }

  function done(returnData, res) {
    console.log('image manipulation done and saved')
    res.send({
      success: true, 
      message: returnData.type+' resized and saved',
      data: returnData
    }) 
  }

  module.remove = function(req, res) { 
    db.collection('products').find({'files.name': req.params.slug}).toArray(function(err, products){
      if(products.length > 1) 
        return doneRemoving(res, req.params.slug)
      if (req.body.type == 'application/pdf') {
        removeFile(mediaBasePath+'product-pdfs/'+ req.body.thumb, req.body.thumb, function(){
          removeFile(mediaBasePath+'product-pdfs/'+ req.body.name, req.body.name, function(){
            doneRemoving(res, req.params.slug)
          })
        })
      } else {
        removeFile(mediaBasePath+'product-images/'+ req.body.medium, req.body.medium, function(){
          removeFile(mediaBasePath+'product-images/'+ req.body.thumb, req.body.thumb, function(){
            doneRemoving(res, req.params.slug)
          })
        })
      }
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
      data: {name: name }
    })
  }

  return module;
};






