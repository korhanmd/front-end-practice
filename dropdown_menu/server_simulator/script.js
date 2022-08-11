const HOST = 'server.com/';

document.onclick = function() {
  api.get(HOST, {}, displayText);
}

function displayText(response) {
  document.body.innerHTML += response;
}

// Server

const endpoints = {
  "/": {
    "get": "hello world"
  }
}

function getFunction(url, data, callback) {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"), url.length);

  callback(endpoints[endpoint]["get"]);
}

const api = {
  get: getFunction
};