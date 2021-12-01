import React, { useEffect, useState } from 'react';
interface Props {
    setGameOverCallback: ()=> void;
    timeInSeconds: number
}
export default function Timer({setGameOverCallback, timeInSeconds}: Props): JSX.Element {
    const [seconds, setSeconds] = useState<number>(timeInSeconds);
    useEffect(() => {
        while(seconds >= 0) {
          let interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
          }, 1000);
          if (seconds === 0) {
            setGameOverCallback();
          }
          return () => { if(interval) clearInterval(interval) };
        }
    }, [seconds, setGameOverCallback]);

    return (
      <div className="timer" data-testid= "timer" >
          {seconds}
      </div>
    )
}