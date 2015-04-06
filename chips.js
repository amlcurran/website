var chips = function() {

  this.load = function(chipView) {

    var request = new XMLHttpRequest();
    request.onload = function(data) {
      chipView.renderChips(JSON.parse(data.target.responseText));
    };
    request.onerror = function() {
      console.log(request.responseText);
    };
    request.open('get', './chips/chip-data.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

  };
  
  return this;

};

this.chipsView = function() {
  
  fadeIn = function(element) {
    element.className = element.className + ' fadeIn';
  };
  
  createChip = function(chip) {
    var a = document.createElement('a');
    a.href = chip.url;
    a.className = a.className + ' chipLink';
    // a.onmouseover = this.mouseOverAction(a, chip);
    // a.onmouseout = this.mouseOutAction(a)
  
    var image = document.createElement('img');
    image.title = chip.title;
    image.className = image.className + ' chip';
    image.src = this.imageUrl(chip);
    image.srcset = this.imageSet(chip);
    image.addEventListener('load', this.fadeIn(image));
    // image.style.backgroundColor = chip.color;
  
    a.appendChild(image);
    return a;
  };

  imageUrl2 = function(chip) {
      return "chips/" + chip.image + "@2x.png";
  };
  
  imageSet = function(chip) {
      return this.imageUrl(chip) + ' 1x, ' + this.imageUrl2(chip) + ' 2x';
  };
  
  imageUrl = function(chip) {
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

// ChipsView.prototype.mouseOverAction = function(target, chip) {
//   return function(e) {
//         target.style.backgroundColor = chip.color;
//   }
// }

// ChipsView.prototype.mouseOutAction = function(target) {
//   return function(e) {
//         target.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
//   }
// }


