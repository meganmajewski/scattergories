import React, { useEffect, useState } from 'react';
interface Props {
    gameOver: boolean,
    setGameOverCallback: ()=> void;
}
export default function Timer(props: Props): JSX.Element {
    const [seconds, setSeconds] = useState<number>(4);
    useEffect(() => {
          //@ts-ignore
          let interval = null;
          if (!props.gameOver) {
            interval = setInterval(() => {
              setSeconds(seconds => seconds - 1);
            }, 1000);
          }
          if (seconds === 0) {
            props.setGameOverCallback();
          }
          //@ts-ignore
          return () => clearInterval(interval);
    }, [props, props.gameOver, seconds]);
    return (<>
        <h2>Time Remaining</h2>
        {seconds}
    </>)
}