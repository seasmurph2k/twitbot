const twitter = require("twit");
const apiKeys = require("./credentials.env");
const Agenda = require("agenda");
const mongoConnectionString = "mongodb://127.0.0.1/twitbot";

//set up agenda
const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "scheduledTweets" }
});

agenda.processEvery("1 minute");

//need error handling
agenda.define("tweet", (job, done) => {
     t.post('statuses/update', {status:job.attrs.data.tweet})
      .then((result)=>{
          //has been tweeted
          job.remove((err)=>{
            if(!err){
                console.log('Removed completed job')
            }
          })
          done()
      }).catch((err)=>{
          console.log(err)
      })
  });

(async function() {
  agenda.on("ready", () => {
    console.log("agenda ready,starting job processor..");
    agenda.start(); //start job processor
  });
})();

//init twitter
const t = new twitter({
  consumer_key: apiKeys.consumer_key,
  consumer_secret: apiKeys.consumer_secret,
  access_token: apiKeys.access_token,
  access_token_secret: apiKeys.access_token_secret,
  timeout_ms: 60 * 1000,
  strictSSL: false
});

function tweet(req, res, next) {
  let content = req.body.tweetText;
  t.post("statuses/update", { status: content })
    .then(result => {
      //obj with keys: data & resp
      next();
    })
    .catch(err => {
      res.render("error", {
        message: err
      });
    });
}

/*
    Returns an array of objects
    text is data[i].text
    date is data[i].created_at
    user info is data[i].user
    profile img url should be data[i].user.profile_img_url
*/

function getLastTweets(res, res, next) {
  t.get("/statuses/user_timeline", { count: 10 })
    .then(result => {
      let tweets = [];
      for (let i = 0; i < result.data.length; i++) {
        let x = {
          text: result.data[i].text,
          date: result.data[i].created_at.substr(0, 16)
        };
        tweets.push(x);
      }
      res.locals.tweets = tweets;
      next();
    })
    .catch(err => {
      res.render("error", {
        message: err
      });
    });
}

module.exports = { tweet, getLastTweets, agenda };
