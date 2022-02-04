require('dotenv').config();
const JSSoup = require('jssoup').default;
const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');
const { default: TwitterApiSubClient } = require('twitter-api-v2/dist/client.subclient');

axios.get(process.env.FEED_URL)
    .then(response => {
        recentEntries = fetchRecentFeedEntries(response.data.items)
        publishTweets(recentEntries)
    })
    .catch(error => {
        console.error(error)
    })

function fetchRecentFeedEntries(feed) {
    return feed.filter(entry => {
        const oneHourAgo = new Date(new Date().getTime() - (2 * 60 * 60 * 1000))
        const postDate = new Date(entry.date_published)
        if (postDate > oneHourAgo) {
            return entry
        }
    })
}

async function publishTweets(tweets) {
    const twitterClient = new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_APP_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET
    })
    twitterClient.readWrite
    twitterClient.currentUserV2()
    .then(user => console.log(user))
    tweets.forEach(tweet => {
        console.log(tweet)
        var soup = new JSSoup(tweet.content_html)
        console.log(soup)
        var tweetText = soup.find('p').text
        twitterClient.v1.tweet(tweetText).then(tweet => console.log(tweet))
    })
}
