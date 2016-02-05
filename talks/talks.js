this.talksView = function(prototype) {

  var talksHolder = document.querySelector('#talks-holder');

  var setText = function(node, text) {
    node.innerText = text;
    node.textContent = text;
  };

  var createTalkItem = function(talk) {
    var talkImport = document.querySelector('#talk-chunk-import').import;
    var talkDiv = talkImport.querySelector('#talk-chunk').cloneNode(true);
    setText(talkDiv.querySelector('#talk-title'), talk.title);
    setText(talkDiv.querySelector('#talk-blurb'), talk.blurb);
    setText(talkDiv.querySelector('#talk-link-1'), talk.online[0].place);
    talkDiv.querySelector('#talk-link-1').href = talk.online[0].url;
    talkDiv.querySelector('#talk-image').style.backgroundImage = 'url(\'/talks/' + talk.image + '\')';
    talkDiv.querySelector('#talk-image').style.backgroundSize = 'cover';
    setText(talkDiv.querySelector('#talk-link-2'), talk.online[1].place);
    talkDiv.querySelector('#talk-link-2').href = talk.online[1].url;
    return talkDiv;
  };

  var addViews = function(talks) {
    for (i = 0; i < talks.length; i++) {
      var talk = talks[i];
      talksHolder.appendChild(createTalkItem(talk));
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
