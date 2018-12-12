$(document).ready(function() {
  console.log('DOM is ready');
});


$('textarea').on('keyup', function() {
  let $textInput = $(this).val();
  let $tweetLength = $textInput.length;
  let $remainingChar = 140 - $tweetLength;
  let $counter = $(this).siblings('.counter');

  $counter.text($remainingChar);

  if ($remainingChar < 0) {
    $counter.css('color', 'red');
  }

});

