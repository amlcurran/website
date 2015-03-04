function Chips () {



}

Chips.prototype.load = function() {

  var request = new XMLHttpRequest();
  request.onload = function(data) {
    console.log(JSON.parse(data.target.responseText));
  }
  request.open('get', './chips/chip-data.json');
  request.send();

}

