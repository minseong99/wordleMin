let attempts = 0;
let index = 0;
let timer;
const correct = "APPLE";

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClick);
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = async () => {
    let correctCnt = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const chEntered = block.innerText;
      const correctLetter = correct[i];

      //add
      const keyBoard = document.querySelector(
        `.key-board-block[data-key='${block.innerText}']`
      );

      if (chEntered === correctLetter) {
        block.style.background = "#6AAA64";
        keyBoard.style.background = "#6AAA64"; // add
        correctCnt += 1;
      } else if (correct.includes(chEntered)) {
        block.style.background = "#C9B458";
        keyBoard.style.background = "#C9B458"; // add
      } else {
        block.style.background = "#788C7E";
        keyBoard.style.background = "#788C7E"; // add
      }
      block.style.color = "white";
      keyBoard.style.color = "white"; // add
    }
    if (correctCnt === 5) gameOver();
    else nextLine();
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  //add
  const handleClick = (event) => {
    if (
      event.target.className === "key-board-block" ||
      event.target.dataset.key === "BACK"
    ) {
      const key = event.target.dataset.key;

      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );

      if (key === "BACK") handleBackspace();
      else if (index === 5) {
        if (key === "ENTER") handleEnterKey();
        else return;
      } else if (key !== "ENTER") {
        thisBlock.innerText = key;
        index += 1;
      }
    } else return;
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const curTime = new Date();
      const passedTime = new Date(curTime - startTime);
      const minutes = passedTime.getMinutes().toString().padStart(2, "0");
      const seconds = passedTime.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector(".timer");
      timer.innerText = `${minutes}:${seconds}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  //add

  window.addEventListener("click", handleClick);
}

appStart();
