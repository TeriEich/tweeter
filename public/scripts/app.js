/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
  let $time = $('<time></time>').text(moment(tweetData.created_at).startOf('hour').fromNow());
  let $span = $('<span></span>').addClass('flags');
  let $flag = $('<i>').addClass('fas fa-flag');
  let $retweet = $('<i>').addClass('fas fa-retweet');
  let $heart = $('<i>').addClass('fas fa-heart');

  $img.attr('src', tweetData.user.avatars.small);

  $article.append($header);
  $header.append($img);
  $header.append($('<h2></h2>').text(tweetData.user.name));
  $header.append($('<h4></h4>').text(tweetData.user.handle));
  $article.append($('<p></p>').text(tweetData.content.text));
  $article.append($footer);
  $footer.append($time);
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
});

$tweetButton.submit(function () {
  let $textBox = $('#submit-tweet textarea');
  let $tweetInput = $textBox.val();
  let $counter = $(this).children('.counter');
  let $errMsg = $('#submit-tweet em');
  const $maxTweetLength = 140;
  $errMsg.text('').slideUp();

  if ($tweetInput && $tweetInput.length <= $maxTweetLength) {
    let $tweetContent = $textBox.serialize();
    $.post('/tweets', $tweetContent, function(data){
      $counter.text(140);
      $tweetButton[0].reset();
      loadTweets();
    });
  } else if (!$tweetInput) {
    $errMsg.text('You can\'t submit a blank tweet!');
    $errMsg.slideDown().delay(400);
  } else {
    $errMsg.text('Wow, you\'re so verbose! Limit it to 140 characters, Tolkien!');
    $errMsg.slideDown().delay(400);
  }
});


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
$('#nav-bar input').click(function () {
  if ($('.new-tweet').is(':hidden')) {
    $('.new-tweet').slideDown();
    $('textarea').focus();
  } else {
    $('.new-tweet').slideUp();
  }
});

