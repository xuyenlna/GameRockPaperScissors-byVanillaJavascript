let data = [
  { id: "rock", src: "./assets/img/rock.png", status: true },
  { id: "paper", src: "./assets/img/paper.png", status: false },
  { id: "scissors", src: "./assets/img/scissors.png", status: false },
];
let divPlayerThinking = document.querySelector(".playerThinking");
let computerThinkingDiv = document.querySelector(".computerThinking");

// render rock, paper, scissors for player choosing
const renderData = () => {
  let divOptionList = document.querySelector(".rockPaperScissors");
  let contentOfList = "";
  contentOfList = data.reduce((content, item) => {
    content += `<button class="button"><img src=${item.src} data-id ="${item.id}"></img></button>`;
    return content;
  }, "");

  divOptionList.innerHTML = contentOfList;
};
renderData();

// render the choice of the player
const buttonList = document.querySelectorAll(".rockPaperScissors button");
for (let button of buttonList) {
  button.addEventListener("click", function (event) {
    let optionId = event.target.getAttribute("data-id");
    let option = data.find((item) => item.id === optionId);
    divPlayerThinking.innerHTML = `<img src="${option.src}" data-id="${option.id}"></img>`;

    // remove the inform requesting to place a bet
    document.querySelector(".inform").classList.add("hide");
  });
}

//PLAY GAME
let result = "";
let numberOfWin = 0;
let totalPlayTurn = 0;
const playButton = document.querySelector(".playButton");
playButton.addEventListener("click", function () {
  //request player to place a bet
  let playerId = divPlayerThinking.querySelector("img").getAttribute("data-id");
  if (playerId === null) {
    document.querySelector(".inform").classList.remove("hide");
    return;
  }

  // the computer play render the random choice
  let count = 0;
  let randomItems = setInterval(() => {
    if (count < 10) {
      count++;
      let randomNumber = Math.floor(Math.random() * 3);
      let randomObj = data[randomNumber];
      computerThinkingDiv.innerHTML = `<img src=${randomObj.src} data-id="${randomObj.id}"></img>`;
    } else {
      clearInterval(randomItems);
      // compare the result between the player and computer

      let computerId = computerThinkingDiv
        .querySelector("img")
        .getAttribute("data-id");

      switch (playerId) {
        case "rock":
          if (computerId === "rock") {
            result = "GAME DRAWS!!!";
          }
          if (computerId === "paper") {
            result = "YOU LOOSE!!!";
          }
          if (computerId === "scissors") {
            result = "YOU WIN!!!";
            numberOfWin += 1;
          }
          break;

        case "paper":
          if (computerId === "paper") {
            result = "GAME DRAWS!!!";
          }
          if (computerId === "scissors") {
            result = "YOU LOOSE!!!";
          }
          if (computerId === "rock") {
            result = "YOU WIN!!!";
            numberOfWin += 1;
          }
          break;

        case "scissors":
          if (computerId === "scissors") {
            result = "GAME DRAWS!!!";
          }
          if (computerId === "rock") {
            result = "YOU LOOSE!!!";
          }
          if (computerId === "paper") {
            result = "YOU WIN!!!";
            numberOfWin += 1;
          }
          break;

        default:
          break;
      }
      totalPlayTurn += 1;

      document.getElementById("informResult").innerText = result;
      document.querySelector("#numbersOfWin span").innerText = numberOfWin;
      document.querySelector("#totalGames span").innerText = totalPlayTurn;
    }
  }, 100);
});
