/**
  *
  * People often use a wrong spelling of some word and sometimes it is irritating. Created this bot to teach them the correct spelling.
  * @Warning: rate-limitting has not been taken care of. Do not use a keyword that is very popular. You will be blocked temporarily because of rate-limiting
  *
*/

var Twitter = require('twitter');

//! Put your application and user's tokens here
var client = new Twitter({
  consumer_key: 'XXXXXXXXXXXXXXXXXXXXXX',
  consumer_secret: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYY',
  access_token_key: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  access_token_secret: 'BBBBBBBBBBBBBBBBBBBBBBBBB'
});

var sWrongSpell = 'gujrat';
var sCorrectSpell = 'Gujarat';
var tweetTemplate = "hey, it's "+sCorrectSpell+", not "+sWrongSpell;

var sBotScreenName = "GujaratBot";

var lastUserID = 0;

client.stream('statuses/filter', {track: sWrongSpell}, function(stream) {
  stream.on('data', function(tweet) {

  	//! Prevent sending tweets to same person again or to the bot itself
  	if(lastUserID==tweet.user.id || sBotScreenName==tweet.user.screen_name) {
  		return;
  	}
  	lastUserID=tweet.user.id;

    client.post('statuses/update', {status: '@'+tweet.user.screen_name+' '+tweetTemplate, in_reply_to_status_id: tweet.id_str},  function(error, tweet, response){
     if(error) throw error;
       console.log(tweet);  // Tweet body.
       console.log(response);  // Raw response object.
    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});
