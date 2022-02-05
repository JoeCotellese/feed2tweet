require('dotenv').config();
const JSSoup = require('jssoup').default;
const axios = require('axios');
const fs = require('fs/promises');
const homedir = require('os').homedir();
const { TwitterApi } = require('twitter-api-v2');

axios.get(process.env.FEED_URL)
    .then(response => {
        processFeed(response.data.items)
    })
    .catch(error => {
        console.error(error)
    })

function processFeed(feed) {
    lastRunDate = new Date()
    fs.readFile(`${homedir}/.feed2tweet/rundate`)
    .then(data => {
        lastRunDate = new Date(data)
        console.log(`Last run date: ${lastRunDate}`)
    })
    .catch(error => {
        lastRunDate = new Date(new Date().getTime() - (2 * 60 * 60 * 1000))
        console.log(`No last run date found. Setting to ${lastRunDate}`)
    })
    .finally(() => {
        const recentEntries = fetchRecentFeedEntries(feed, lastRunDate)
        publishTweets(recentEntries)
        fs.writeFile(`${homedir}/.feed2tweet/rundate`, new Date(Date.now()).toISOString())
    })
}


function fetchRecentFeedEntries(feed, lastRunDate) {
    console.log(`Fetching recent entries since ${lastRunDate}`)
    return feed.filter(entry => {
        const postDate = new Date(entry.date_published)
        if (postDate > lastRunDate) {
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
        var soup = new JSSoup(tweet.content_html)
        var tweetText = soup.find('p').text
        console.log(`publishing tweet: ${tweetText}`)
        // twitterClient.v1.tweet(tweetText).then(tweet => console.log(tweet))
    })
}

