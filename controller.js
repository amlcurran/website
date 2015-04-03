var Controller = function() {

  var self = this;
  var me = document.querySelector('#me');
  var talks = document.querySelector('#talks');
  var all = [me, talks];

  this.show = function(element) {
    element.className = element.className + ' shown fadeInFast';
  };

  this.hideOthers = function(element) {
    all.forEach(function(item, index, array) {
      if (item === element) {
        // Nothing
      } else {
        item.classList.remove('shown');
        item.classList.remove('fadeInFast');
      }
    });
  };
  
  this.displayHome = function() {
    var homeImage = document.querySelector('#homeimage');
    homeImage.className = homeImage.className.replace( /(?:^|\s)home-image-hidden(?!\S)/ , '');
    console.log(homeImage.className);
  };
  
  this.hideHome = function() {
    var homeImage = document.querySelector('#homeimage');
    if (homeImage.className.indexOf('home-image-hidden') === -1) {
      homeImage.className = homeImage.className + ' home-image-hidden'; 
    }
  };

  this.link = function() {
    console.log('linking controller');
      window.onhashchange = function(event) {
        console.log(location.hash);
        if (location.hash === '#me') {
          self.hideHome();
          self.show(this.me);
          self.hideOthers(this.me);
        } else {
          self.displayHome();
          if (location.hash === '#talks') {
            self.show(this.talks);
            self.hideOthers(this.talks);
          }
        }
      };

      // Load me by default
      self.show(me);
      self.hideOthers(me);
  };

  return this;

};