import React from 'react'
import liljohn from "../lilJohn.svg";
import logo from "../logo_2.svg";
import Timer from "./Timer";
import CategoryList from './CategoryList';
import data from "../categories.json";
import Answer from '../types/Answer';
interface Props {
    gameNum: number,
    userId: string,
    letter: string,
    setAnswerAtIndex: (answer: Answer)=> void;
    gameIsOver: boolean,
    setGameOverCallback: ()=>void
}
export default function Game({gameNum, userId, letter, setAnswerAtIndex, gameIsOver, setGameOverCallback} : Props) {
    const printList = () => {
        const list = data[gameNum - 1];
        //@ts-ignore
        return list[gameNum].map((cat, index) => {
          return (
              <CategoryList key={index} gameid={gameNum} userId={userId} index={index + 1} category={cat} setAnswersCallback={setAnswerAtIndex} />
          );
        });
      };
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
          <div className="letter" data-testid="letter">
            <span>{letter}</span>
            <Timer setGameOverCallback={setGameOverCallback} timeInSeconds={5}/>
        </div>
        </div>
      </div>
    )
}
