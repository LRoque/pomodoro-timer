import React from 'react';

function Audio() {
  return (
    <div>
      {/* <h1>AUDIO!</h1> */}
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default Audio;
