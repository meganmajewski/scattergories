import React, { useEffect, useState } from 'react';
interface Props {
    setGameOverCallback: ()=> void;
}
export default function Timer({setGameOverCallback}: Props): JSX.Element {
    const [seconds, setSeconds] = useState<number>(5);
    useEffect(() => {
          let interval = setInterval(() => {
              setSeconds(seconds => seconds - 1);
            }, 1000);
          if (seconds === 0) {
            setGameOverCallback();
          }
          return () => { if(interval) clearInterval(interval) };
    }, [seconds]);

    return (
      <div className="timer">
          {seconds}
      </div>
    )
}