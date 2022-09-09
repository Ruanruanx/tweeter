/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  const renderTweets = function(dataSet) {
    for (let data of dataSet) {
      const $tweet = createTweetElement(data);
      // Test / driver code (temporary)
      console.log($tweet); // to see what it looks like
      $('#tweets-container').append($tweet);
    }

  }

  const createTweetElement = function(data) {
    let $tweet = `<article>
  <header class="tweet-header">
    <div class="imgAndName">
      <img src= ${data.user.avatars}>
      <span class="userName">${data.user.name}</span>            
    </div>
    <div class="userID">
      <span>${data.user.handle}</span>
    </div>
  </header>
  <section class="main">
    ${data.content.text}
  </section>
  <footer class="tweet-footer">
    <div class="publish-date">
      ${data.created_at}
    </div>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
       <i class="fa-solid fa-heart"></i>
       <i class="fa-solid fa-retweet"></i>
    </div>
  </footer>
  </article>`
    return $tweet
  }

const loadTweets = function(){
  $.ajax({
    type: 'GET',
    url: "/tweets",
    success: (tweets)=>{
      renderTweets(tweets)
    }
  })
}
loadTweets();
$("form").submit(function(event) {
  event.preventDefault();
  $.ajax({
    type: 'POST',
    data: $(this).serialize(),
    url: "/tweets",
    success: ()=>{
      loadTweets()
    }
  })
})

})