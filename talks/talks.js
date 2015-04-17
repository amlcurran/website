this.talksView = function() {
  
  var talksHolder = document.querySelector('#talks-holder');
  
  createTalkItem = function(talk) {
    var talkDiv = document.createElement('talkDiv');
    talkDiv.innerText = talk.title;
    return talkDiv;
  };
  
  return {
    
    loaded : function(talks) {
        var chipsInner = document.createElement('div');
        for (i = 0; i < talks.length; i++) {
          var talk = talks[i];
          talksHolder.appendChild(createTalkItem(talk));
        } 
    }
    
  };
  
};