const seed = require("../../../utils/save-seed.js");
var Twitter = require("twitter");

// load environment variables
require("dotenv").config();

var client = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: "",
  access_token_secret: ""
});

var params = {
  screen_name: "mikeriethmuller",
  count: 50,
  exclude_replies: true
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    client.get("statuses/user_timeline", params, function(
      error,
      tweets,
      response
    ) {
      if (!error) {
        // Build an object in a useful structure for us
        var recentTweets = { recent: [] };
        for (const tweet in tweets) {
          var t = {
            text: tweets[tweet].text,
            url:
              "https://twitter.com/mikeriethmuller/status/" +
              tweets[tweet].id_str,
            date: tweets[tweet].created_at
          };
          recentTweets.recent.push(t);
        }

        seed(JSON.stringify(recentTweets), `${__dirname}/../dev/tweets.json`);
        resolve();
      } else {
        reject();
        console.log(error);
      }
    });
  });
};
