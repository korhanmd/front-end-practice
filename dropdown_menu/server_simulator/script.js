const HOST = 'server.com/';

document.onclick = function() {
  api.get(HOST, {}, displayText);
}

function displayText(response) {
  document.body.innerHTML += response;
}

// Server

function getMenus(data) {
  switch (data.menu) {
    case "a":
      return "I got an A";
    case "b":
      return "I got a B";
    default:
      return "I don't know what I got";
  }
}

const endpoints = {
  "/": {
    "get": () => "hello world"
  },
  "/menus": {
    "get": getMenus
  }
}

// API library

function getFunction(url, data, callback) {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"), url.length);

  callback(endpoints[endpoint]["get"][data]);
}

const api = {
  get: getFunction
};