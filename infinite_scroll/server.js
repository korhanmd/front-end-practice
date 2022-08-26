// Server

function getRandomString({length, includeSpaces}) {
	let characterChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
	
	if (includeSpaces) {
		characterChoices += ' ';
	}

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
		if (!lastTweetId) {
			return this.tweets.slice(0, pageSize);
		}

		for (let i = 0; i < this.tweets.length; i++) {
			const currentTweet = this.tweets[i];

			if (currentTweet.id === lastTweetId) {
				return this.tweets.slice(i + 1, i + 1 + pageSize);
			}
		}

		return [];
	}

	insert(tweet) {
		this.tweets.push({
			tweet,
			id: getRandomString({length: 50}),
			timestamp: (new Date()).getTime()
		});
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

// API library

function getFunction(url, data, callback) {
	const domain = url.substring(0, url.indexOf("/"));
	const endpoint = url.substring(url.indexOf("/"), url.length);

	setTimeout(() => callback(endpoints[endpoint]["get"](data)), 2000);
}

function postFunction(url, data, callback) {
	const domain = url.substring(0, url.indexOf("/"));
	const endpoint = url.substring(url.indexOf("/"), url.length);

	callback(endpoints[endpoint]["post"](data));
}

const api = {
	get: getFunction,
	post: postFunction
};

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

function createTweet({name, handle, message}) {
	const template = `
   		<div class="tweet">
			<div class="tweet__column avatar">
        		<img class="avatar__image" src="images/dog.jpeg" />
      		</div>
      		<div class="tweet__column tweet__main">
        		<div class="tweet__main__header">
          			<div class="tweet__main__header__item tweet__main__header__item--name">
            			${name}
          			</div>
          			<div class="tweet__main__header__item tweet__main__header__item--badge">
            			<img class="tweet__icon tweet__main__header__item__badge" src="images/footer_icon.svg">
          			</div>
          			<div class="tweet__main__header__item tweet__main__header__item--handle">
            			${handle}
          			</div>
          			<div class="tweet__main__header__item tweet__main__header__item--duration">
            			7h
          			</div>
        		</div>
        		<div class="tweet__main__message">
          			${message}
        		</div>
        		<div class="tweet__footer">
          			<div class="tweet__footer__stats">
            			<img class="tweet__icon tweet__footer__stats__item" src="images/footer_icon.svg" />
            			<div class="tweet__footer__stats__item">
              				10
            			</div>
          			</div>
          			<div class="tweet__footer__stats">
            			<img class="tweet__icon tweet__footer__stats__item" src="images/footer_icon.svg" />
            			<div class="tweet__footer__stats__item">
              				900
            			</div>
          			</div>
          			<div class="tweet__footer__stats">
            			<img class="tweet__icon tweet__footer__stats__item" src="images/footer_icon.svg" />
            			<div class="tweet__footer__stats__item">
              				1.1K
            			</div>
          			</div>
          			<div class="tweet__footer__stats">
            			<img class="tweet__icon tweet__footer__stats__item" src="images/footer_icon.svg" />
          			</div>
        		</div>
      		</div>
      		<div class="tweet__menu">
        		<img class="tweet__icon tweet__menu__icon" src="images/down_icon.svg">
      		</div>
    	</div>
  `;

  return template;
}