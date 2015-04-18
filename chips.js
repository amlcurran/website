this.chipsView = function() {
  
  var fadeIn = function(element) {
    element.className = element.className + ' fadeIn';
  };
  
  var createChip = function(chip) {
    var a = document.createElement('a');
    a.href = chip.url;
    a.className = a.className + ' chipLink';
    // a.onmouseover = this.mouseOverAction(a, chip);
    // a.onmouseout = this.mouseOutAction(a)
  
    var image = document.createElement('img');
    image.title = chip.title;
    image.className = image.className + ' chip';
    image.src = imageUrl(chip);
    image.srcset = imageSet(chip);
    image.addEventListener('load', fadeIn(image));
    // image.style.backgroundColor = chip.color;
  
    a.appendChild(image);
    return a;
  };

  var imageUrl2 = function(chip) {
      return "chips/" + chip.image + "@2x.png";
  };
  
  var imageSet = function(chip) {
      return imageUrl(chip) + ' 1x, ' + imageUrl2(chip) + ' 2x';
  };
  
  var imageUrl = function(chip) {
      return "chips/" + chip.image + ".png";
  };
  
  return {
    
    loaded : function(chips) {

        var chipsHolder = document.querySelector('#chips_holder');
        var chipsInner = document.createElement('div');
        for (i = 0; i < chips.length; i++) {
          var chip = chips[i];
          chipsHolder.appendChild(createChip(chip));
        }
    
    }
    
  };

};


