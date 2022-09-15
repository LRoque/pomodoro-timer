import React from 'react';

function Controls(props) {
  return (
    <div>
      <i
        id="start_stop"
        onClick={props.playPauseTimer}
        className={
          props.isRunning.value ? 'fa-solid fa-pause' : 'fa-solid fa-play'
        }></i>
      <i
        id="reset"
        onClick={props.reset}
        className="fa-solid fa-arrows-rotate"></i>
    </div>
  );
}

export default Controls;
