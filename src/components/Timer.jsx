import React from 'react';

function Timer(props) {
  function formatTime(timeInSeconds) {
    return {
      minutes: Math.floor(timeInSeconds / 60),
      seconds: timeInSeconds - Math.floor(timeInSeconds / 60) * 60,
    };
  }

  const timer = formatTime(props.remainingTime);

  return (
    <div>
      <h2 id="timer-label">{props.type}</h2>
      <h1 id="time-left">
        {timer.minutes.toLocaleString('en-Us', {
          minimumIntegerDigits: 2,
        }) +
          ':' +
          timer.seconds.toLocaleString('en-Us', {
            minimumIntegerDigits: 2,
          })}
      </h1>
    </div>
  );
}

export default Timer;
