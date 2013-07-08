define(function(require) {

var AlertView = require('views/site/alert').alert
  , tpl = require('text!fileUpload/templates/thumbs.mustache')

var ItemView = Backbone.View.extend({

  tagName:  "li",

  events: {
    "click a.remove": "remove",
    "click a.setMainImage": 'setMainImage',
    "click a.editCaption": 'editCaption',
    "keypress .caption-input"  : "updateOnEnter",
    "dblclick div.caption-text"    : "editCaption",
  },

  template: Hogan.compile(tpl),

  initialize: function(options){
    this.file = options.file
    _.bindAll(this)
    this.model.on('change', this.render, this)
  },

  addInputBlur: function(){
   //adding here so it can be cleared when el re-rendered
   this.input.on('blur', this.close, this)
  },

  editCaption: function() {
    $(this.el).addClass("editing");
    this.input.val(this.model.get('caption'))
    this.input.focus()
  },

  close: function() {
    this.model.set({'caption': this.input.val()});
    this.model.collection.parent.set('files', this.model.collection)
    this.model.collection.parent.save()
    $(this.el).removeClass("editing");
  },

  updateOnEnter: function(e) {
    if (e.keyCode == 13) this.close();
  },

  setMainImage: function() {
    // TODO  set main image attr on file model which is the submodel so can be deleted later
    this.model.collection.parent.set({'mainImage': this.model.toJSON()})
    this.model.collection.parent.save()
    new AlertView({message: '<strong>Main image selected</strong>', type: 'info'})
    this.model.collection.parent.trigger('mainImage:selected', this.model)
  },

  remove: function(e) {
    // TODO remove the main image attr
    var params = {}
    params.contentType = "application/json"
    params.data = JSON.stringify(this.model.toJSON())
    var parentModel = this.model.collection.parent
    var collection = this.model.collection
    this.model.destroy(params)
    parentModel.set({files: collection})
    parentModel.save()
    $(this.el).remove()
    new AlertView({message: '<strong>Removed</strong>', type: 'info'})
  },

  render: function() {
    var locals = this.model.toJSON()
    if (/^image/.test(locals.type))
      locals.image = true 
    if (/application\/pdf/.test(locals.type)){
      locals.pdf = true
      if (typeof locals.caption !== 'undefined' && locals.caption)
        locals.caption_set = true
      else
        locals.caption_set = false
    }
    var template = this.template.render(locals)
    $(this.el).html(template)
    this.input = $('.caption-input', this.el)
    this.addInputBlur()
    this.model.view = this
    return this
  },
});

return Backbone.View.extend({

  tagName: 'ul',
  className: 'thumbs',

  initialize: function() {
    _.bindAll(this); 
    this.model.on('change:files:added', this.addOne, this)
    this.model.on('mainImage:selected', this.addMainImageHeader, this)
  },

  addMainImageHeader: function(model){
    if(this.mainImageModel)
      this.mainImageModel.view.render()       
    this.mainImageModel = model
    $('.mainImage', model.view.el).html('<p class="pretend-thumb"><i class="icon-ok"></i> main image</p>')
  },

  getMainImage: function(files){
    var curMain = files.parent.get('mainImage')
    if (!curMain) return
    return files.find(function(model){ 
      if (model.get('name') == curMain.name)
        return model 
    })
  },

  addOne: function(model){
    var view = new ItemView({ model: model })
    var html = view.render().el
    $(this.el).append(html)
  },

  render: function() {
    var files = this.model.get('files')
    files.each(this.addOne, this)
    var mainImage = this.getMainImage(files)
    if (mainImage)
      this.addMainImageHeader(mainImage)
    return this
  },
})

})
