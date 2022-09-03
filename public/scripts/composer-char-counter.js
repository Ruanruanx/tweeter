$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready");
  $("textarea").keypress(function() {
    let len = $(this).val().length+1;
    let leftLen = 140-len;
    $(this).children('.counter').text( leftLen);
  });
});