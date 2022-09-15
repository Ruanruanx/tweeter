/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const renderTweets = function(dataSet) {

    // const $tweet = 
    //  
    // Test / driver code (temporary)
    const $tweets = dataSet.map((data) => {
      return createTweetElement(data);
    })
    $('#tweets-container').html($tweets)

  }
//Avoid user add script
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Create Tweet, generated in html first
  const createTweetElement = function(data) {
    let tweet = `<article>
  <header class="tweet-header">
    <div class="imgAndName">
      <img src= ${data.user.avatars}>
      <span class="userName">${data.user.name}</span>            
    </div>
    <div class="userID">
      <span>${data.user.handle}</span>
    </div>
  </header>
  </br>
  <section class="main">
    ${escape(data.content.text)}
  </section>
  <footer class="tweet-footer">
    <div class="publish-date">
${timeago.format(data.created_at - 1 * 1000)}
    </div>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
       <i class="fa-solid fa-heart"></i>
       <i class="fa-solid fa-retweet"></i>
    </div>
  </footer>
  </article>`
    return tweet
  }

  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: "/tweets",
      success: (tweets) => {
        console.log($(".error"))
        $(".error").hide();
        renderTweets(tweets)
      }
    })
  }
  $(".error").hide();
  loadTweets();

  //submit text and show error message
  $("form").submit(function(event) {
    if ($("textarea").val().length === 0) {
      $(".error").hide();
      $("#empty").slideDown(1000);
      return false;
    } else if ($("textarea").val().length > 140) {
      $(".error").hide();
      $("#tooLong").slideDown(1000);
      return false;
    } else {
      event.preventDefault();
      $.ajax({
        type: 'POST',
        data: $(this).serialize(),
        url: "/tweets",
        success: () => {
          loadTweets();
          $("#newForm")[0].reset();
          $('.counter')[0].innerText = 140;
        }
      })
    }

  })

})