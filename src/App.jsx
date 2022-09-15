import React from 'react';
import Config from './components/Config';
import Controls from './components/Controls';
import Timer from './components/Timer';
import Audio from './components/Audio';

function App() {
  const [sessionDuration, setSessionDuration] = React.useState(25 * 60);
  const [breakDuration, setBreakDuration] = React.useState(5 * 60);
  const [isRunning, setIsRunning] = React.useState({
    value: false,
    type: 'Session',
  });
  const [remainingTime, setRemainingTime] = React.useState(25 * 60);

  function increment(configName) {
    switch (configName) {
      case 'breakDuration':
        if (breakDuration === 60 * 60) return;
        setBreakDuration(prevValue => prevValue + 60);
        break;
      case 'sessionDuration':
        if (sessionDuration === 60 * 60) return;
        setSessionDuration(prevValue => prevValue + 60);
        setRemainingTime(sessionDuration + 60);
        break;
      default:
        return;
    }
  }

  function decrement(configName) {
    switch (configName) {
      case 'breakDuration':
        if (breakDuration <= 60) return;
        setBreakDuration(prevValue => prevValue - 60);
        break;
      case 'sessionDuration':
        if (sessionDuration <= 60) return;
        setSessionDuration(prevValue => prevValue - 60);
        setRemainingTime(sessionDuration - 60);
        break;
      default:
        return;
    }
  }

  React.useEffect(() => {
    let interval = null;
    if (isRunning.value) {
      interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function playPauseTimer() {
    setIsRunning(prevValue => ({
      ...prevValue,
      value: !prevValue.value,
    }));
  }

  function updateRemainingTime() {
    setRemainingTime(prevValue => {
      if (prevValue === 0) {
        playBeep();
        switch (isRunning.type) {
          case 'Session':
            setIsRunning(prevValue => ({
              ...prevValue,
              type: 'Break',
            }));
            return breakDuration;
          case 'Break':
            setIsRunning(prevValue => ({
              ...prevValue,
              type: 'Session',
            }));
            return sessionDuration;
          default:
            break;
        }
      } else return prevValue - 1;
    });
  }

  function playBeep() {
    const audio = document.getElementById('beep');
    audio.play();
  }

  function stopBeep() {
    const audio = document.getElementById('beep');
    audio.pause();
    audio.load();
  }

  function reset() {
    setIsRunning({
      value: false,
      type: 'Session',
    });
    setSessionDuration(25 * 60);
    setBreakDuration(5 * 60);
    setRemainingTime(25 * 60);
    stopBeep();
  }

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <Config
        id="break"
        duration={breakDuration}
        increment={increment}
        decrement={decrement}
      />
      <Config
        id="session"
        duration={sessionDuration}
        increment={increment}
        decrement={decrement}
      />
      <Timer remainingTime={remainingTime} type={isRunning.type} />
      <Controls
        reset={reset}
        isRunning={isRunning}
        playPauseTimer={playPauseTimer}
      />
      <Audio />
    </div>
  );
}

export default App;
