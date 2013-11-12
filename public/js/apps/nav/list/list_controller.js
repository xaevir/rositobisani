define([ 
  'appMarionette',
  'apps/nav/list/list_view'
], function(App, NavView){

  return {
    listNav: function(){
      var links = App.request("nav:entities");
      var nav = new NavView({collection: links});

      nav.on("brand:clicked", function(){
        App.trigger("home:show");
      });

      nav.on("itemview:navigate", function(childView, model){
        var trigger = model.get("navigationTrigger");
        App.trigger(trigger);
      });

      App.navRegion.show(nav);
    },

    setActiveLink: function(linkUrl){
      var links = App.request("nav:entities");
      var linkToSelect = links.find(function(link){ return link.get("url") === linkUrl; });
      if(typeof linkToSelect === 'undefined') { // passing in param as empty to clear
        if (this.previousSelected)
         this.previousSelected.deselect() 
       } else {
        linkToSelect.select();
        this.previousSelected = linkToSelect
      }
      links.trigger("reset");
    }
  };
});
