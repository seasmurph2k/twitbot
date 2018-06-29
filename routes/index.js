const express = require("express");
const router = express.Router();
const twitterLib = require("../lib/twitter");

router.get("/", twitterLib.getLastTweets, (req, res, next) => {
  res.render("index", {
    tweets: res.locals.tweets
  });
});

router.post("/", twitterLib.tweet, (req, res, next) => {
  res.redirect("/");
});

router.get("/schedule", (req, res, next) => {
    req.db.collection('scheduledTweets').find({})
    .toArray((err,docs)=>{
        if(err){
            res.render('error',{
                message: err
            })
        }
        else{
            let scheduledTweets = []
            for(let i = 0; i < docs.length; i++){
                if(docs[i].nextRunAt){
                    let tmp = {
                        'tweet' : docs[i].data.tweet,
                        'when' : docs[i].nextRunAt.toString().substr(0,21)
                    }
                    scheduledTweets.push(tmp)

                }
                else{
                    console.log('remove ' + docs[i]._id)
                    console.log(docs[i].data.tweet)
                }
            }
            res.render('schedule', {
                tweets : scheduledTweets
            })
        }
    });
});

router.post("/schedule", (req, res, next) => {
    let when = req.body.date +'T'+ req.body.time;
    twitterLib.agenda.schedule(
        when,
        "tweet",
        { tweet: req.body.tweetText },
        () => {
            console.log("job persisted in db");
        }
    );
    res.redirect('/schedule');
});

module.exports = router;