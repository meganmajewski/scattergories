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
    console.log("index: ", index);
    console.log("letter:", letters[index]);
    return letters[index];
  };
  const nextGame = () => {
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

  return <div className="App">{showGame()}</div>;
}

export default App;
