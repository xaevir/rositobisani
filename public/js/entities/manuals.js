define([ 
  'appMarionette',
  'entities/manual',
], function(App, Manuel){

  var Manuals = Backbone.Collection.extend({
    url: "/manuals",
    model: Manuel,
  });

  var initializeManuals = function(){
    var manuals = new Manuals([
      { id: 1, name: 'MFG Manual', slug: 'MFG_Operations_Manual.pdf', thumb: 'MFG_Operations_Manual_thumb.jpg',  category: '51db047ebaea90738a903c1d' },
      { id: 2, name: 'MFGR Manual', slug: 'MFGR_Operations_Manual.pdf', thumb: 'MFGR_Operations_Manual_thumb.jpg',  category: '51db047ebaea90738a903c1d' },
      { id: 3, name: 'MF Woodfired Manual', slug: 'MF_Woodfired_Operations_Manual.pdf', thumb: 'MF_Woodfired_Operations_Manual_thumb.jpg', category: '51db047ebaea90738a903c1d' },
      { id: 1, name: 'MFG Manual', slug: 'MFG_Operations_Manual.pdf', thumb: 'MFG_Operations_Manual_thumb.jpg',  category: '51db047ebaea90738a903c1d' },
      { id: 2, name: 'MFGR Manual', slug: 'MFGR_Operations_Manual.pdf', thumb: 'MFGR_Operations_Manual_thumb.jpg',  category: '51db047ebaea90738a903c1d' },
      { id: 3, name: 'MF Woodfired Manual', slug: 'MF_Woodfired_Operations_Manual.pdf', thumb: 'MF_Woodfired_Operations_Manual_thumb.jpg', category: '51db047ebaea90738a903c1d' },
 
    ]);
    //manuals.forEach(function(manual){
    //  manual.save();
    //});
    //return manuals.models;
    return manuals;
  };

  var API = {
    getAll: function(){
      var manuals = new Manuals();
      var defer = $.Deferred();
      manuals.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },
  };

  App.reqres.setHandler("manual:entities", function(){
    return API.getAll();
  });

  return;
});
