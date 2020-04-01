import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./categories.json";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "W"
];
function App() {
  const [gameNum, setGameNum] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(5);
  const [gameOver, setGameOver] = useState<boolean>(true);

  useEffect(() => {
    //@ts-ignore
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) setGameOver(true);
    //@ts-ignore
    return () => clearInterval(interval);
  }, [gameOver, seconds]);

  const printList = () => {
    const list = data[gameNum];
    const index = gameNum;
    //@ts-ignore
    return list[index + 1].map((cat, index) => {
      return (
        <li className="list-item" key={index}>
          {cat}
        </li>
      );
    });
  };

  const printLetter = () => {
    const index = Math.floor(Math.random() * (20 - 1)) + 1;
    return letters[index];
  };
  const nextGame = () => {
    setGameOver(false);
    //start second count down;
    if (gameNum === 19) {
      setGameNum(0);
      return;
    } else {
      setGameNum(gameNum + 1);
    }
  };
  const showGame = () => {
    return (
      <div className="list">
        <div className="left first">
          <h1>List #{gameNum + 1}</h1>
          <div>
            <ol>{printList()}</ol>
          </div>
        </div>
        <div className="left">
          <h2>Letter</h2>
          <div className="letter">{printLetter()}</div>
        </div>
        <div className="clear">
          <button className="start-button" onClick={nextGame}>
            Next Game
          </button>
        </div>
      </div>
    );
  };
  if (gameOver)
    return (
      <div className="newGame">
        <button onClick={nextGame}>start game</button>
      </div>
    );
  // else if(seconds !=== 0 && !gameOver)
  else return <div className="App">{showGame()}</div>;
}

export default App;
