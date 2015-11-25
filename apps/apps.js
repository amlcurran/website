this.appsView = function(prototype) {

  var appsHolder = document.querySelector('#apps-holder');

  var setText = function(node, text) {
    node.innerText = text;
    node.textContent = text;
  };

  var createAppItem = function(app) {
    var talkImport = document.querySelector('#talk-chunk-import').import;
    var appDiv = talkImport.querySelector('#talk-chunk').cloneNode(true);
    setText(appDiv.querySelector('#talk-title'), app.title);
    setText(appDiv.querySelector('#talk-blurb'), app.blurb);
    if (app.coming_soon == 1) {
        setText(appDiv.querySelector('#talk-title'), app.title + " (coming soon)");
    }
    if (app.online) {
        setText(appDiv.querySelector('#talk-link-1'), app.online.place);
        appDiv.querySelector('#talk-link-1').href = app.online.url;
    }
    if (app.image) {
        appDiv.querySelector('#talk-image').style.backgroundImage = 'url(\'' + app.image + '\')';
    }
    appDiv.querySelector('#talk-link-2').style.display = 'none';
    return appDiv;
  };

  var createLargerItem = function(app) {
      var appDiv = createAppItem(app);
      removeClass(appDiv, 'card');
      addClass(appDiv, 'large-card');
      return appDiv;
  }

  var addViews = function(apps) {
    for (i = 0; i < apps.length; i++) {
      var app = apps[i];
      if ((i + 1) % 3 == 0) {
          appsHolder.appendChild(createLargerItem(app));
      } else {
          appsHolder.appendChild(createAppItem(app));
      }
    }
  };

  return function() {

    var returnee = Object.create(prototype);
    returnee.loaded = function(talks) {

      if (document.querySelector('#talk-chunk-import').import) {
        addViews(talks);
      } else {
        window.addEventListener('HTMLImportsLoaded', function() {
          addViews(talks);
        });
      }

    };

    return returnee;

  }();

};
