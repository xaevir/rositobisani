var fs = require('fs')
    , imagemagick = require('imagemagick')

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
// hack delete the images in the tmp folder when done uploading



exports.create = function(req, res) { 
  req.files.file.name = toSlugFile(req.files.file.name)
  var file = req.files.file
  var regex = /^(.+)\.([a-zA-Z]+)/
  var match = regex.exec(file.name);
  var nameNoExt = match[1]
  var extension = match[2]
  var basePath = '/home/bobby/Dropbox/http/rositobisani/public/'

  if (file.type == 'application/pdf') {
    var thumbName = nameNoExt+'_thumb_pdf.png'
    var mediumName = nameNoExt+'_medium_pdf.png'
    var image_input = file.path + '[0]' 
    //var input = file.path
    var output = '/tmp/'+file.name+'.png'
    var mediumSize = '300x400>'
    var thumbnailSize = '175x155>'
    var pathOnServer = basePath+'product-pdfs/'
  } else {
    var thumbName = nameNoExt+'_thumb.'+extension
    var mediumName = nameNoExt+'_medium.'+extension
    //var input = file.path
    var image_input = file.path
    var output = '/tmp/'+file.name
    var mediumSize = '400x500>'
    var thumbnailSize = '175x155>'
    var pathOnServer = basePath+'product-images/'
  }
  

  startWithMedium()

  function startWithMedium(){
    var options = [image_input, '-resize', mediumSize, '-quality', '100', pathOnServer + mediumName]
    imagemagick.convert(options, function(err, metadata){
      if(err) throw err;
      console.log('image resized to 400x500 and saved')
      createThumb() 
    });
  }

  function createThumb(){
    var options = [image_input, '-resize', thumbnailSize, '-quality', '100', pathOnServer + thumbName]
    imagemagick.convert(options, function(err, metadata){
      if(err) throw err;
      console.log('image thumbnail created and saved')
      removeTmp()
    })
  }

  function removeTmp(){
    fs.unlink(image_input, function (err) {
      if (err) throw err;
      console.log('successfully deleted tmp');
      done(file.name)
    });
  }

  function done(name) {
    console.log('image manipulation done and saved')
    res.send({
      success: true, 
      message: file.type+' resized and saved',
      data: {
        name: name, 
        type: file.type,
        medium: mediumName,
        thumb: thumbName,
      }
    })    
  }
}



