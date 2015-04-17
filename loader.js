var loader = function() {
  
  var jobs = [];
  
  var addJob = function(url, callback) {
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
        request.open('get', url);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();  
  };
    
    return {
    
      load : function(url, callback) {
        addJob(url, callback);  
      }
    
    };
  
};