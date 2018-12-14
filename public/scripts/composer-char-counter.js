$(document).ready(function() {
});

//changes the character counter with tweet length:
$('textarea').on('keyup', function() {
  let $tweetInput = $(this).val();
  const $maxTweetLength = 140;
  let $remainingChar = $maxTweetLength - $tweetInput.length;
  let $counter = $(this).siblings('.counter');

  $counter.text($remainingChar);

  if ($remainingChar < 0) {
    $counter.css('color', 'red');
  } else {
    $counter.css('color', '#244751');
  }
});

