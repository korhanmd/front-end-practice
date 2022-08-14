const searchInput = document.getElementsByClassName('search__bar__input')[0];

function onNewInput(event) {
	const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
	suggestionsElement.innerHTML += (searchInput.value + '<br>');
}

searchInput.oninput = onNewInput;