$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready");
  $('.counter')[0].innerText = 140;
  $("textarea").on('input',function() {
    let len = $(this).val().length;
    let leftLen = 140 - len;
    let count = $(this).parent().find('.counter');
    $("<textarea>").text($(this).val());
    if (leftLen < 0) {
      count.css('color', 'red');
    } else {
      count.css('color', '#545149');
    }

    $(this).parent().find('.counter')[0].innerText = leftLen;
  });
});