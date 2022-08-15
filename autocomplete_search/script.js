const HOST = 'server.com/';

const searchInput = document.getElementsByClassName('search__bar__input')[0];

function onSuggestionsResponse(data) {
	const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
	suggestionsElement.innerHTML += (data + '<br>');
}

function onNewInput(event) {
	api.get(HOST + 'autocomplete', searchInput.value, onSuggestionsResponse);
}

searchInput.oninput = onNewInput;

// Server

function getAutocompleteHandler(data) {
	const results = [];
	for (let i = 0; i < 10; i++) {
		results.push("asdf");
	}
	return results;
}

const endpoints = {
	"/": {
		"get": () => "hello world"
	},

	"/autocomplete": {
		"get": getAutocompleteHandler
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