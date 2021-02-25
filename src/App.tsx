import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./categories.json";
import { io } from "socket.io-client";
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
  const [seconds, setSeconds] = useState<number>(180);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [letter, setLetter] = useState<string>("");
  const [response, setResponse] = useState("");
  const ENDPOINT = "http://127.0.0.1:4001";
  useEffect(() => {
    const socket = io(ENDPOINT);
    //@ts-ignore
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setGameOver(true);
      setLetter("");
      setSeconds(180);
    }
    //@ts-ignore
    return () => clearInterval(interval);
  }, [gameOver, seconds, letter]);

  const printList = () => {
    const list = data[gameNum];
    const index = gameNum;
    //@ts-ignore
    return list[index].map((cat, index) => {
      return (
        <li className="list-item" key={index}>
          {cat}
        </li>
      );
    });
  };

  const newLetter = () => {
    console.log("new letter");
    const index = Math.floor(Math.random() * (20 - 1)) + 1;
    setLetter(letters[index]);
  };
  const nextGame = () => {
    newLetter();
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
          <h1>List #{gameNum}</h1>
          <div>
           response: {response}
            <ol>{printList()}</ol>
          </div>
        </div>
        <div className="left">
          <h2>Letter</h2>
          <div className="letter">{letter}</div>
          <h2>Time Remaining</h2>
          {seconds}
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
  else return <div className="App">{showGame()}</div>;
}

export default App;
