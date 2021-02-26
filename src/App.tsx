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
  userId: string,
  input: string,
  categoryId: number
}
export interface Results {
  input: string,
  categoryid:number,
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
      // setResponse(data);
    });
  }, []);

  function gameIsOver() {
    axios.post('/answers', answers)
    setGameOver(true);
    setAnswers([{userId: "", categoryId: 0, input: "getresults"}]);
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
        <CategoryList userId={user} index={index + 1} category={cat} setAnswersCallback={setAnswerAtIndex} /> 
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
  function showResults() {
    if(answers[0] && answers[0].input === "getresults") {
     return <button onClick={()=> {
      axios.get('/answers').then((response)=> {
        setResults(response.data.response.results.results)
      })
     }}> See results </button>
    }
  }
  function printResults() {
    const resultsPerUser = results?.filter(result => result.userid === user);    console.log(resultsPerUser);
    return resultsPerUser?.map(result => {
      return (<div>{result.categoryid} : {result.input}</div>)
    })
  }
  if (gameOver && !results)
    return (
      <div className="newGame">
        <input onChange={(e)=> {
          setUser(e.target.value)
        }}></input>
        <button onClick={nextGame}>start game</button>
        {showResults()}
      </div>
    );
  else if(results) {
    return <>{printResults()}</>
  }
  else return <div className="App">{showGame()}</div>;
}

export default App;
