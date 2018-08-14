# Twitbot

Basic twitter bot for scheduling tweets

## Setup
1. Clone this repo:
```
git clone https://github.com/seasmurph2k/twitbot.git
```
2. Run npm install
```
npm install
```
3. Place your twitter api credentials in lib/credentials.env
```
const twitLogin = {
    'consumer_key': '',
    'consumer_secret': '',
    'access_token': '',
    'access_token_secret': '' 
}
```
4. npm start

Note: DB Connection string is in lib/twitter.js

### Todo:
1. Add Media
2. Follower/unfollower
3. Add more social media sites (Insta/reddit)
4. Change UI

### Screens:
#### Home Page:
![alt text](https://i.imgur.com/3yekMF6.png "Home Page")

#### Schedule Page:
![alt text](https://i.imgur.com/L1zJ6WX.png "Schedule Page")
