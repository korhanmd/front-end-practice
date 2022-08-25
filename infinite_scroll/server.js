// Server

function getRandomString({length}) {
	const characterChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
	const characters = [];

	while (characters.length < length) {
		const randomIndex = Math.floor(Math.random() * characterChoices.length);
		characters.push(characterChoices[randomIndex]);
	}

	return characters.join('');
}

function getRandomInteger({min, max}) {
	return Math.floor(Math.random() * (max - min) + min);
}