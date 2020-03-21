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
  const [seconds, setSeconds] = useState(30);
  const [start, setStart] = useState(false);
  const [letter, setLetter] = useState("");

  useEffect(() => {
    if (!start) {
      return;
    }
    if (seconds === 0) setStart(false);
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start, seconds]);
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

  const getLetter = () => {
    const index = Math.floor(Math.random() * (20 - 1)) + 1;
    console.log("index: ", index);
    console.log("letter:", letters[index]);
    setLetter(letters[index]);
  };
  const nextGame = () => {
    setStart(true);
    setSeconds(30);
    getLetter();
    if (gameNum === 10) {
      setGameNum(0);
    } else {
      setGameNum(gameNum + 1);
    }
  };
  const showGame = () => {
    if (start) {
      return (
        <div className="list">
          <div className="left first">
            <h1>List #{gameNum + 1}</h1>
            <div>
              <ul>{printList()}</ul>
            </div>
          </div>
          <div className="left">
            <h2>Letter</h2>
            <div className="letter">{letter}</div>
          </div>
        </div>
      );
    }
  };
  const printSeconds = () => {
    if (seconds === 0) return <h1>Times Up!</h1>;
    else return <h1> {seconds} </h1>;
  };

  return (
    <div className="App">
      <h2>Time Remaining</h2>
      <p>{printSeconds()}</p>
      <button className="start-button" onClick={nextGame}>
        Start Clock
      </button>
      {showGame()}
    </div>
  );
}

export default App;
