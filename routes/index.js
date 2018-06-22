const express = require('express');
const router = express.Router();
const twitterLib = require('../lib/twitter')

router.get('/', twitterLib.getLastTweets,
    (req,res,next)=>{
        res.render('index',{
            tweets: res.locals.tweets
        })
})

router.post('/', twitterLib.tweet,
    (req,res,next)=>{
        res.redirect('/')
})


router.get('/schedule', (req,res,next)=>{
    res.render('schedule');
})

module.exports = router;