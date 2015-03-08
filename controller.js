var Controller = function() {

  var self = this;
  var me = document.querySelector('#me');
  var talks = document.querySelector('#talks');
  var all = [me, talks];

  this.show = function(element) {
    element.className = element.className + ' shown fadeInFast';
  }

  this.hideOthers = function(element) {
    all.forEach(function(item, index, array) {
      if (item === element) {
        // Nothing
      } else {
        item.classList.remove('shown');
        item.classList.remove('fadeInFast');
      }
    });
  }

  this.link = function() {
      window.onhashchange = function(event) {
        console.log(location.hash);
        if (location.hash === '#me') {
          self.show(this.me);
          self.hideOthers(this.me);
        } else if (location.hash === '#talks') {
          self.show(this.talks);
          self.hideOthers(this.talks);
        }
      }
  }

  return this;

};

// Load me by default
location.hash = '#me';