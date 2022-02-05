# Feed2Tweet

Feed2Tweet will take a JSON feed and publish it to Twitter.

## Description

I use the blogging service [micro.blog](https://micro.blog). In general it's
really excellent. It support cross posting to Twitter however, for some reason
this doesn't work for me.

I built this little script to solve that problem.

Run the script in a cron and it will publish all of the feed entries since it's
last run.

The last run information is stored in $(HOME)/.feed2tweet/rundate

## Getting Started

### Dependencies

* Twitter developer account
* Node
* a website that outputs a JSON feed

### Installing

After cloning the repo, copy the example .env file and update it with the Twitter
tokens you need to use.

    cp .env-example .env
    mkdir $(HOME)/.feed2tweet
    npm install


### Executing program

```
node feed2tweet.js
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

[@JoeCotellese](https://twitter.com/JoeCotellese)

## License

This project is licensed under the 
[MIT License](https://opensource.org/licenses/MIT)

