this.talksView = function() {
  
  var talksHolder = document.querySelector('#talks-holder');
  var talksChunkBase = document.querySelector('#talk-chunk-import').import;
  
  createTalkItem = function(talk) {
    var talkDiv = talksChunkBase.querySelector('#talk-chunk').cloneNode(true);
    talkDiv.querySelector('#talk-title').innerText = talk.title;
    talkDiv.querySelector('#talk-blurb').innerText = talk.blurb;
    talkDiv.querySelector('#talk-link').innerText = talk.online.place;
    talkDiv.querySelector('#talk-link').href = talk.online.url;
    talkDiv.querySelector('#talk-image').style.backgroundImage = 'url("talks/' + talk.image + '")';
    talkDiv.querySelector('#talk-dl').href = talk.online.dl;
    return talkDiv;
  };
  
  return {
    
    loaded : function(talks) {
        for (i = 0; i < talks.length; i++) {
          var talk = talks[i];
          talksHolder.appendChild(createTalkItem(talk));
        } 
    }
    
  };
  
};