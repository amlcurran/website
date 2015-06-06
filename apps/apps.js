this.appsView = function(prototype) {

  var appsHolder = document.querySelector('#apps-holder');

  var setText = function(node, text) {
    node.innerText = text;
    node.textContent = text;
  };

  var createTalkItem = function(talk) {
    var talkImport = document.querySelector('#talk-chunk-import').import;
    var talkDiv = talkImport.querySelector('#talk-chunk').cloneNode(true);
    setText(talkDiv.querySelector('#talk-title'), talk.title);
    setText(talkDiv.querySelector('#talk-blurb'), talk.blurb);
    setText(talkDiv.querySelector('#talk-link'), talk.online.place);
    talkDiv.querySelector('#talk-link').href = talk.online.url;
    talkDiv.querySelector('#talk-image').style.backgroundImage = 'url(\'/talks/' + talk.image + '\')';
    talkDiv.querySelector('#talk-dl').href = talk.online.dl;
    return talkDiv;
  };

  var addViews = function(talks) {
    for (i = 0; i < talks.length; i++) {
      var talk = talks[i];
      appsHolder.appendChild(createTalkItem(talk));
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