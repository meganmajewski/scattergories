import React, { useState } from 'react';
import logo from "../logo_2.svg";
interface Props {
    nextGame: (user: string)=> void;
}
export default function StartPage({nextGame}: Props) {
    const [ user, setUser ] = useState<string>("");
    return (
        <div className="newGame">
        <div className="header">
          <img src={logo}  alt="Scattergories, FordLabs edition" data-testid="scattergories logo"/>
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
        <button onClick={()=> nextGame(user)} data-testid="start game button">Start</button>
        <div className="rulesContainer">
            New to Scattergories? Read Rules
            <a className="rulesLink" href="https://github.com/meganmajewski/scattergories/wiki/Rules-of-the-game/">Here</a></div>
          {/* {showResults()} */}
        </div>
      </div>
    )
}
