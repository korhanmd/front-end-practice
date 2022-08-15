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

function getRandomString({length}) { ... }
function getRandomInteger({min, max}) { ... }

function generateSuggestion(prefix) {
	const RATIO_EXACT_MATCH = 0.3;
	const RATIO_AUTOCORRECT = 0.1;

	if (Math.random() < RATIO_AUTOCORRECT) {
		return getRandomString({ length: getRandomInteger({min: 1, max: prefix.length})});
	}

	if (Math.random() < RATIO_EXACT_MATCH) {
		return prefix;
	}

	return prefix + getRandomString({ length: getRandomInteger({min: 1, max: 10})});
}

function getAutocompleteHandler(data) {
	const MAX_CHARS = 10;
	const NUM_AUTOCOMPLETE_RESULTS = 10;
	const RATIO_AUXILIARY_DATA = 0.1;

	if (data.length > MAX_CHARS) {
		return [];
	}

	const results = [];
	while (results.length < NUM_AUTOCOMPLETE_RESULTS) {
		const suggestion = generateSuggestion(data);

		if (Math.random() < RATIO_AUXILIARY_DATA) {
			results.push({
				suggestion,
				auxiliary: getRandomString({length: getRandomInteger({min: 5, max: 15})})
			});
		} else {
			results.push({suggestion, auxiliary: ""});
		}
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