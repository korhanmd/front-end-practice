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

class Database {
	constructor() {
		this.tweets = [];
	}

	query({lastTweetId, pageSize}) {
		// TODO
	}

	insert(tweet) {
		// TODO
	}
}

const database = new Database();

function getTweetsHandler(data) {
	const pageSize = data.pageSize;
	const sortOrder = data.sortOrder;
	const lastTweetId = data.lastTweetId;

	if (sortOrder !== 'recent') {
		throw new Error('I dont know how to handle that');
	}

	return database.query({lastTweetId, pageSize});
}

function postTweetHandler(data) {
	database.insert(data.tweet);
}

const endpoints = {
	"/tweets": {
		"get": getTweetsHandler,
		"post": postTweetHandler
	}
}

function loadTestData() {
	const sampleData = [];
	const sampleDataSize = 20;

	for (let i = 0; i < sampleDataSize; i++) {
		const message = getRandomString({
			length: getRandomInteger({min: 10, max: 150}),
			includeSpaces: true
		});

		const firstName = getRandomString({
			length: getRandomInteger({min: 3, max: 7}),
			includeSpaces: false
		});

		const lastName = getRandomString({
			length: getRandomInteger({min: 3, max: 7}),
			includeSpaces: false
		});

		const handle = '@' + getRandomString({
			length: getRandomInteger({min: 4, max: 8}),
			includeSpaces: false
		});

		sampleData.push({
			tweet: {
				name: `${firstName} ${lastName}`,
				message, handle
			}
		});
	}

	for (const data of sampleData) {
		api.post(HOST + 'tweets', data, () => {});
	}
}