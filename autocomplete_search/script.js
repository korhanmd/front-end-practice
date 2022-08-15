const searchInput = document.getElementsByClassName('search__bar__input')[0];

function onNewInput(event) {
	const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
	suggestionsElement.innerHTML += (searchInput.value + '<br>');
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