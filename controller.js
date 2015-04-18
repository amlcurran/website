var controller = function() {

  var self = this;
  var me = document.querySelector('#me');
  var talks = document.querySelector('#talks');
  var all = [me, talks];

  var show = function(element) {
    element.className = element.className + ' shown fadeInFast';
  };

  var hideOthers = function(element) {
    all.forEach(function(item, index, array) {
      if (item === element) {
        // Nothing
      } else {
        item.classList.remove('shown');
        item.classList.remove('fadeInFast');
      }
    });
  };
  
  var displayHome = function() {
    var homeImage = document.querySelector('#homeimage');
    homeImage.className = homeImage.className.replace( /(?:^|\s)home-image-hidden(?!\S)/ , '');
    console.log(homeImage.className);
  };
  
  var hideHome = function() {
    var homeImage = document.querySelector('#homeimage');
    self.addClass(homeImage, 'home-image-hidden');
  };
  
  this.addClass = function(element, className) {
    if ('classList' in element) {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
    } else {
      if (element.className.indexOf(className) === -1) {
        element.className = element.className + ' ' + className; 
      }
    }
    
  };
  
  this.removeClass = function(element, className) {
    if ('classList' in element) {
      element.classList.remove(className);
    } else {
      var classes = element.className.split(/\s+/);
      var newClasses = [];
      for (var oldClass in classes) {
        if (classes[oldClass] !== className) {
          newClasses[newClasses.length] = classes[oldClass]; 
        }
      }
      var newClassName = '';
      for (var newClass in newClasses) {
        newClassName = newClassName + ' ' + newClasses[newClass];  
      }
      element.className = newClassName;  
    }
  };
  
  controlHashChange = function() {
    console.log(location.hash);
          if (location.hash === '#me') {
            hideHome();
            show(this.me);
            hideOthers(this.me);
          } else {
            displayHome();
            if (location.hash === '#talks') {
              show(this.talks);
              hideOthers(this.talks);
            }
          }
  };

  return {
    
    link : function() {
        console.log('linking controller');
      
        // Load me by default
        if (location.hash === undefined || location.hash === '') { 
          location.hash = "me";
        }
        
        window.onhashchange = function(event) {
          console.log(location.hash);
          controlHashChange();
        };
        
        var scrollableTabs = document.querySelector('#nav-tabs');
        var scrollHint = document.querySelector('#scroll-hint');
        if (scrollableTabs.scrollWidth !== scrollableTabs.clientWidth) {
          console.log('adding scroll listener');
          scrollableTabs.onscroll = function() {
            var left = scrollableTabs.scrollLeft;
            var scrollWidth = scrollableTabs.scrollWidth;
            var width = scrollableTabs.clientWidth;
            var slop = scrollWidth / 8;
            if (left + width === scrollWidth) {
              self.removeClass(scrollHint, 'fadedIn');
              self.addClass(scrollHint, 'fadedOut'); 
            } else {
              self.removeClass(scrollHint, 'fadedOut');
              self.addClass(scrollHint, 'fadedIn'); 
            }
          };
        } else {
          scrollHint.style.display = 'none';
        }
  
        controlHashChange();
    } 
    
  };

};