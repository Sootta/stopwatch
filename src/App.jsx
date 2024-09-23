import { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css'

function App() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [accumulatedTime, setAccumulatedTime] = useState(0); 

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        const now = moment();
        const duration = moment.duration(now.diff(startTime));
        setElapsedTime(duration.asMilliseconds() + accumulatedTime);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, startTime, accumulatedTime])

  const stert_stop = () => {
    if(isRunning){
      setIsRunning(false);
      const now = moment();
      const duration = moment.duration(now.diff(startTime));
      setAccumulatedTime(duration.asMilliseconds() + accumulatedTime);
    }
    else {
      setStartTime(moment());
      setIsRunning(true);
    }
  }

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setStartTime(null);
    setAccumulatedTime(0);
  }

  return (
    <div className='App'>
      <h2>Stop Watch</h2>
      <h1>{moment.utc(elapsedTime).format('HH:mm:ss.SSS')}</h1>
      <div className='twoBottun'>
        <button onClick={reset}>Reset</button>
        <button onClick={stert_stop}>Start / Stop</button>
      </div>

    </div>
  )
}

export default App
