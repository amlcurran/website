var loader = function() {
    
    return {
    
      load : function(callback) {
  
        var request = new XMLHttpRequest();
        request.onload = function(data) {
          callback.loaded(JSON.parse(data.target.responseText));
        };
        request.onerror = function() {
          console.log(request.responseText);
          if ('error' in callback) {
            callback.error(request.responseText);
          }
        };
        request.open('get', './chips/chip-data.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
    
      }
    
    };
  
};