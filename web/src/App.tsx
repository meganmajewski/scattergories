import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Answer from "./types/Answer";
import Results from "./types/Results";
import ResultsList from "./components/ResultsList";
import StartPage from "./components/StartPage";
import Game from "./components/Game";



const letters = [
  "J",
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
  "P",
  "K",
  "N",
  "O",
  "W",
  "D",
];

function App() {
  const [gameNum, setGameNum] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const [letter, setLetter] = useState<string>("");
  const [user, setUser] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([] as Answer[]);
  const [results, setResults] = useState<Results[]>();

 
  const ENDPOINT = "https://scattegories.herokuapp.com";
 
  // useEffect(() => {
  //   const socket = io(ENDPOINT);
  //   //@ts-ignore
  //   socket.on("FromAPI", data => {

  //   });
  // }, []);

  function gameIsOver() {
    axios.post('/answers', answers)
    setGameOver(true);
    // setAnswers([{gameid: gameNum, userId: "", categoryId: 0, input: "getresults"}]);
    showResults();
  }

  function setAnswerAtIndex(answer: Answer) {
   setAnswers((prevAnswer) => [
     ...prevAnswer.filter((answer_loop) => answer_loop.categoryId !== answer.categoryId),
     answer
   ]);
  }


  const newLetter = () => {
    const letter = letters[gameNum];
    // const index = Math.floor(Math.random() * (20 - 1)) + 1;
    setLetter(letter);
  };
  const nextGame = (user: string) => {
    setUser(user);
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

  function showResults() {
    if(answers[0]) {
      return <button className="resultsButton" onClick={()=> {
       axios.get('/answers').then((response)=> {
         setResults(response.data.response.results.results)
       })
      }}> See results </button>
    }
  }

  if (gameOver && !results)  {
    return ( <>
        <StartPage nextGame={nextGame}/>
        {showResults()}
      </>
    );
  }
  else if(results) {
    return (
      <>
        <ResultsList results={results} userId={user} gameNum={gameNum}/>
        <div className="left">
          <div className="letter">
            <span>{letter}</span>
            <span className="timer">Times Up!</span>
          </div>
          <div className="clear">
            <button className="start-button" onClick={()=> nextGame(user)}>
              Next Game
            </button>
          </div>
        </div>
    </>
    )
  }
  else return <div className="App"><Game gameNum={gameNum} userId={user} letter={letter} setAnswerAtIndex={setAnswerAtIndex} gameIsOver={gameOver} setGameOverCallback={()=> setGameOver(true)}/></div>;
}

export default App;
