/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const moment = require('moment');

//RENDERS TWEETS ON PAGE
function renderTweets (tweets) {
  tweets.forEach(function(tweetData) {
    let $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  });
}

//CREATE STRUCTURE FOR TWEETS
function createTweetElement (tweetData) {
  let $article = $('<article></article>');
  let $header = $('<header></header>');
  let $img = $('<img>').addClass('avatar');
  let $footer = $('<footer></footer>');
  let $span = $('<span></span>').addClass('flags');
  let $flag = $('<i>').addClass('fas fa-flag');
  let $retweet = $('<i>').addClass('fas fa-retweet');
  let $heart = $('<i>').addClass('fas fa-heart');

  $img.attr('src', tweetData.user.avatars.small);
  // $timeStamp = moment(tweetData.created_at).startOf('hour').fromNow();

  $article.append($header);
  $header.append($img);
  $header.append($('<h2></h2>').text(tweetData.user.name));
  $header.append($('<h4></h4>').text(tweetData.user.handle));
  $article.append($('<p></p>').text(tweetData.content.text));
  $article.append($footer);
  $footer.append($('<time></time>').text(tweetData.created_at));
  // $footer.append($('<time></time>').text($timeStamp));
  $footer.append($span);
  $span.append($flag);
  $span.append($retweet);
  $span.append($heart);

  return $article;
}


$(document).ready(function() {
//POSTS A NEW TWEET TO PAGE
let $tweetButton = $('#submit-tweet');
$tweetButton.submit(function(event) {
  event.preventDefault();
})

$tweetButton.submit(function () {
  let $tweetInput = $('#submit-tweet textarea').val();
  const $maxTweetLength = 140;

  if ($tweetInput && $tweetInput.length <= $maxTweetLength) {
    let $tweetContent = $('textarea').serialize();
    $.post('/tweets', $tweetContent, function(data){
    loadTweets();
    // $('textarea').val("");
    // $('.counter').val(140);
    $('#submit-tweet')[0].reset();
    // $('.new-tweet').toggle(display);
    // $('.counter').innerText.reset();
    });
  } else if (!$tweetInput) {
    alert('You can\'t submit a blank tweet!');
  } else {
    alert('Wow, you\'re so verbose! Try to limit it to 140 characters, Tolkien!');
  }
})

//LOADS NEW TWEET TO PAGE
function loadTweets () {
  $.get('/tweets', function(data) {
  $('#tweets-container').empty();
    renderTweets(data);
  });
}

loadTweets();
});


//TOGGLE NEW TWEET
let $compose = $('#nav-bar input');
$compose.click(function () {
$('.new-tweet').toggle('slow');
})
