this.bootstrap = function() {

  var theLoader = loader();
  var theChipsView = chipsView();
  var theTalksView = talksView(controllableView('#talks', theLoader, './talks/talks-data.json'));
  var theController = controller(theTalksView);
  theLoader.load('./chips/chip-data.json', theChipsView);
  // theLoader.load('./talks/talks-data.json', theTalksView);
  theController.link();

};

this.controllableView = function(selector, loader, url) {
  
  var cachedData;
  
  var loadFromNetwork = function(callback) {
    
    loader.load(url, {
      
      loaded : function(data) {
        cachedData = data;
        callback.loaded(cachedData);
      },
      
      error : function(err) {
        callback.error(error);
      }
      
    });
    
  };
  
  return {
    show : function() {
      var element = document.querySelector(selector);
      element.className = element.className + ' shown fadeInFast';
    },
    loadSelf : function() {
      
      if (cachedData) {
        // Don't do anything for now 
      } else {
        loadFromNetwork(this);
      }
    }
  };
};

bootstrap.apply(this);