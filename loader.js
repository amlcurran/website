var loader = function() {

  var jobs = [];

  var addJob = function(url, callback) {
    get(url).then(function(success) {
      callback.loaded(success);
    }, function(error) {
      if ('error' in callback) {
        callback.error(error);
      }
  }).catch(function(error) {
      console.log(error);
  });
  };

  var get = function(url) {
      if ('fetch' in window) {
          return fetch(url).then(function(response) {
              if (response.status == 200) {
                  return response.json();
              } else {
                  reject(Error(response.statusText));
              }
          })
      } else {
          return new Promise(function(resolve, reject) {
              var request = new XMLHttpRequest();
              request.onload = function(data) {
                  if (request.status == 200) {
                      resolve(JSON.parse(data.target.responseText));
                  } else {
                      reject(Error(request.statusText));
                  }
              };
              request.onerror = function() {
                  reject(Error("Network error ocurred"));
              };
              request.open('get', url);
              request.setRequestHeader('Content-type', 'application/json');
              request.send();
          });
}
  };

    return {

      load : function(url, callback) {
        addJob(url, callback);
      }

    };

};
