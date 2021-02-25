import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./categories.json";
import { io } from "socket.io-client";
import CategoryList from "./components/CategoryList";
import Timer from "./components/Timer";
import axios from "axios";
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
export interface Answer {
  input: string,
  categoryId:number
}
function App() {
  const [gameNum, setGameNum] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const [letter, setLetter] = useState<string>("");
  const [response, setResponse] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([] as Answer[]);

 
  const ENDPOINT = "https://scattegories.herokuapp.com";
 
  useEffect(() => {
    const socket = io(ENDPOINT);
    //@ts-ignore
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  function gameIsOver() {
    axios.post('/answers', answers);
    setGameOver(true);
  }

  function setAnswerAtIndex(answer: Answer) {
   setAnswers((prevAnswer) => [
     ...prevAnswer.filter((answer_loop) => answer_loop.categoryId !== answer.categoryId),
     answer
   ]);
  }
  const printList = () => {
    const list = data[gameNum - 1];
    //@ts-ignore
    return list[gameNum].map((cat, index) => {
      return (
        <CategoryList index={index + 1} category={cat} setAnswersCallback={setAnswerAtIndex} /> 
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
          <Timer gameOver={gameOver} setGameOverCallback={gameIsOver}/>
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
