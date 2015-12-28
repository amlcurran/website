var controller = function(talksView, appsView) {

  var self = this;
  var me = document.querySelector('#me');
  var talks = document.querySelector('#talks');
  var apps = document.querySelector('#apps');
  var all = [me, talks, apps];

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
    var homeImages = document.querySelectorAll('#homeimage');
    for (var i = 0; i < homeImages.length; i++) {
        var homeImage = homeImages[i];
        self.removeClass(homeImage, 'home-image-hidden');
    }
  };

  var hideHome = function() {
    var homeImages = document.querySelectorAll('#homeimage');
    for (var i = 0; i < homeImages.length; i++) {
        var homeImage = homeImages[i];
        self.addClass(homeImage, 'home-image-hidden');
    }
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
              talksView.show();
              talksView.loadSelf();
              hideOthers(this.talks);
            } else if (location.hash === '#apps') {
                appsView.show();
                appsView.loadSelf();
              hideOthers(this.apps);
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

        controlHashChange();
    }

  };

};
