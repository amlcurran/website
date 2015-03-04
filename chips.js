function Chips () {



}

Chips.prototype.load = function(callback) {

  var request = new XMLHttpRequest();
  request.onload = function(data) {
    callback(JSON.parse(data.target.responseText));
  }
  request.open('get', './chips/chip-data.json');
  request.send();

}

