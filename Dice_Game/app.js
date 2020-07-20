/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, active_player, dice, gamePlaying;

function init() {
  scores = [0, 0];
  active_player = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "block";

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

function next_player() {
  active_player === 0 ? (active_player = 1) : (active_player = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");

  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + active_player
      ).textContent = roundScore;
    } else {
      next_player();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    scores[active_player] += roundScore;

    document.querySelector("#score-" + active_player).textContent =
      scores[active_player];

    if (scores[active_player] >= 20) {
      document.querySelector("#name-" + active_player).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + active_player + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + active_player + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      next_player();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);
Z;
