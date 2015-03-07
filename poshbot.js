/**
  * 
  * Poshbot tweets "Posh" in reply to every tweet of certain users.
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

//! Put User IDs of all the users you want to follow to send "Posh" to their tweets. Comma-separated list.
var sUsersToFollow = '83539371,938605435,95863779,1036630249,44054071,93562329,53658389,71795977,16629930,37197755,140499597,11594372,116751641,223251457,40625711';

client.stream('statuses/filter', {follow: sUsersToFollow}, function(stream) {
  stream.on('data', function(tweet) {
    var uniqueAppendStr = new Date().getTime();
    client.post('statuses/update', {status: '@'+tweet.user.screen_name+' Posh! #PoshBot #'+uniqueAppendStr, in_reply_to_status_id: tweet.id},  function(error, tweet, response){
     if(error) throw error;
       console.log(tweet);  // Tweet body.
       console.log(response);  // Raw response object.
    });
  });

  stream.on('error', function(error) {
    throw error;
  });
});
