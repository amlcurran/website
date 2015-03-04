new Chips().load(function(chips) {

  var chipsHolder = document.querySelector('#chips_holder');
  for (i = 0; i < chips.length; i++) {
    var a = document.createElement('a');
    var linkText = document.createTextNode(chips[i].title);
    a.appendChild(linkText);
    a.title = chips[i].title;
    a.href = chips[i].url;
    chipsHolder.appendChild(a);
  }

});