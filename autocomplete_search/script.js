const searchInput = document.getElementsByClassName('search__bar__input')[0];

function onNewInput(event) {
	const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
	suggestionsElement.innerHTML += (searchInput.value + '<br>');
}

searchInput.oninput = onNewInput;

// Server

const endpoints = {
	"/": {
		"get": () => "hello world"
	}
}

// API library

function getFunction(url, data, callback) {
	const domain = url.substring(0, url.indexOf("/"));
	const endpoint = url.substring(url.indexOf("/"), url.length);

	callback(endpoints[endpoint]["get"](data));
}

const api = {
	get: getFunction
};