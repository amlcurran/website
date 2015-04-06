var loader = (function() {
  
  return function() {
    
    load = function(chipView) {

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
  
}());