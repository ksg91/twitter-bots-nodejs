/**
  *
  * People often use a wrong spelling of some word and sometimes it is irritating. Created this bot to teach them the correct spelling.
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

client.stream('statuses/filter', {follow: sUsersToFollow}, function(stream) {
  stream.on('data', function(tweet) {
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
