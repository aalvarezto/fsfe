const listaTweets = document.querySelector("#lista-tweets");

eventListeners();

function eventListeners() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agreagarTweet);

  listaTweets.addEventListener("click", borrarTweet);

  document.addEventListener("DOMContentLoaded", localStorageListo);
}

function agreagarTweet(e) {
  e.preventDefault();

  const tweet = document.getElementById("tweet").value;
  if (tweet.length !== 0) {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = tweet;

    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);

    agreagarTweetLocalStorage(tweet);
    document.getElementById("tweet").value = "";
  }
}

function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function(tweet) {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = tweet;

    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
  });
}

function agreagarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  tweets.push(tweet);

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
  let tweets;
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

function borrarTweetLocalStorage(tweet) {
  let tweets;
  let tweetBorrar;

  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet, index) => {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
