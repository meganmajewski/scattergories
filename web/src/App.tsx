import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./categories.json";
import { io } from "socket.io-client";
import CategoryList from "./components/CategoryList";
import Timer from "./components/Timer";
import axios from "axios";
import liljohn from "./lilJohn.svg";
import logo from "./logo_2.svg";

const letters = [
  "M",
  "L",
  "T",
  "S",
  "B",
  "G",
  "R",
  "C",
  "E",
  "F",
  "A",
  "H",
  "I",
  "J",
  "P",
  "K",
  "N",
  "O",
  "W",
  "D",
];
export interface Answer {
  gameid: number,
  userId: string,
  input: string,
  categoryId: number
}
export interface Results {
  input: string,
  categoryid: number,
  gameid:number,
  userid: string
}
function App() {
  const [gameNum, setGameNum] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const [letter, setLetter] = useState<string>("");
  const [user, setUser] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([] as Answer[]);
  const [results, setResults] = useState<Results[]>();

 
  const ENDPOINT = "https://scattegories.herokuapp.com";
 
  useEffect(() => {
    const socket = io(ENDPOINT);
    //@ts-ignore
    socket.on("FromAPI", data => {

    });
  }, []);

  function gameIsOver() {
    axios.post('/answers', answers)
    setGameOver(true);
    setAnswers([{gameid: gameNum, userId: "", categoryId: 0, input: "getresults"}]);
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
          <CategoryList gameid = {gameNum} userId={user} index={index + 1} category={cat} setAnswersCallback={setAnswerAtIndex} />
      );
    });
  };

  const newLetter = () => {
    const letter = letters[gameNum];
    // const index = Math.floor(Math.random() * (20 - 1)) + 1;
    setLetter(letter);
  };
  const nextGame = () => {
    newLetter();
    setGameOver(false);
    setResults(undefined)
    //start second count down;
    if (gameNum === 19) {
      setGameNum(0);
      return;
    } else {
      setGameNum(prevState => prevState + 1)
    }
  };
  const showGame = () => {
    return (
      <div className="list">
        <div className="logo-container">
          <img src={logo} alt="Scattergories, FordLabs edition"/>

        </div>
        <div className="left first">
          <div className="category-list">
            <h1><img className="liljohn" src={liljohn} alt="John Handy's head opening with squirrels coming out"/>Round {gameNum}</h1>
            <ol>{printList()}</ol>
          </div>
        </div>
        <div className="left">
          <div className="letter">
            <span>{letter}</span>
          <Timer gameOver={gameOver} setGameOverCallback={gameIsOver}/>
        </div>
        </div>
      </div>
    );
  };
  function showResults() {
    if(answers[0] && answers[0].input === "getresults") {
     return <button className="resultsButton" onClick={()=> {
      axios.get('/answers').then((response)=> {
        setResults(response.data.response.results.results)
      })
     }}> See results </button>
    }
  }
  function printResults() {

    const resultsPerUser = results?.filter(result => result.userid === user && result.gameid === gameNum);    console.log(resultsPerUser);
    return resultsPerUser?.map(result => {
      return (<div className="resultsList">{result.categoryid} : {result.input}</div>)
    })
  }
  if (gameOver && !results)
    return (
      <div className="newGame">
        <div className="header">
          <img src={logo}  alt="Scattergories, FordLabs edition"/>
        </div>
        <div className="nameContainer">
        <div className="nameEntry">Enter your name:</div>
        <div className="inputName">
          <input className="inputBox" onChange={(e)=> {
            setUser(e.target.value)
          }}></input>
        </div>
        </div>
        <div>
        <button onClick={nextGame}>Start</button>
        <div className="rulesContainer">New to Scattergories? Read Rules <a className="rulesLink" href="https://github.com/meganmajewski/scattergories/wiki/Rules-of-the-game/">Here</a></div>
          {showResults()}
          </div>
      </div>
    );
  else if(results) {
    return (
      <div className="left first">
        <div className="left category-list">
          <h1><img className="liljohn" src={liljohn} alt="John Handy's head opening with squirrels coming out"/>Round {gameNum}</h1>
          {printResults()}
        </div>
        <div className="left">
          <div className="letter">
            <span>{letter}</span>
            <span className="timer">Times Up!</span>
          </div>
          <div className="clear">
          <button className="start-button" onClick={nextGame}>
            Next Game
          </button>
        </div>
      </div>
      </div>)
  }
  else return <div className="App">{showGame()}</div>;
}

export default App;
