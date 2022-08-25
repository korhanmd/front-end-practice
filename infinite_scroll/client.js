const HOST = 'server.com/';

// Client

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_SORT_ORDER = 'recent';

function onNewTweets(data) {
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
}

loadTestData();
hydrate();