const HOST = 'server.com/';

// Client

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_SORT_ORDER = 'recent';

const States = {
    PENDING: 'pending',
    READY: 'ready'
};

let componentState = States.READY;

const loadingElement = document.createElement('div');
loadingElement.classList.add('tweet');
loadingElement.innerHTML = `
    Here I am... Loading...
    <img class="loading__image" src="images/dog.jpeg" />
`;

function setPending() {
    componentState = States.PENDING;
    document.body.appendChild(loadingElement);
}

function setReady() {
    componentState = States.READY;
    document.body.removeChild(loadingElement);
}

function onNewTweets(data) {
    setReady();

    let tweetsHTML = '';

    for (const tweetResponse of data) {
        const tweet = createTweet(tweetResponse.tweet);
        tweetsHTML += tweet;
    }

    document.body.innerHTML = tweetsHTML;
}

function hydrate() {
    const params = {
        pageSize: DEFAULT_PAGE_SIZE,
        sortOrder: DEFAULT_SORT_ORDER
    };

    api.get(HOST + 'tweets', params, onNewTweets);
    setPending();
}

loadTestData();
hydrate();