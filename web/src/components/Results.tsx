import React from "react";
import Results from "../types/Results";
import liljohn from "../lilJohn.svg";
interface Props {
    results: Results[],
    userId: string,
    gameNum: number
}
export default function ResultsList({results, userId, gameNum}: Props): JSX.Element {
    function printResults(): JSX.Element[] {
        const resultsPerUser = results?.filter(result => result.userid === userId && result.gameid === gameNum);    console.log(resultsPerUser);
        return resultsPerUser?.map(result => {
          return (<div className="resultsList">{result.categoryid} : {result.input}</div>)
        })
      }
    return (
        <div className="left first">
        <div className="left category-list">
          <h1><img className="liljohn" src={liljohn} alt="John Handy's head opening with squirrels coming out"/>Round {gameNum}</h1>
          {printResults()}
        </div>
      </div>
    )
}

