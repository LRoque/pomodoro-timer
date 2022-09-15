import React from 'react';
import './Config.css';

function Config(props) {
  const name = props.id.charAt(0).toUpperCase() + props.id.slice(1);
  const configName = props.id + 'Duration';

  return (
    <div>
      <h2 id={`${props.id}-label`}>{name} Length</h2>
      <i
        id={`${props.id}-decrement`}
        onClick={() => props.decrement(configName)}
        className="fa-solid fa-arrow-down"></i>
      <h2 id={`${props.id}-length`}>{props.duration / 60}</h2>
      <i
        id={`${props.id}-increment`}
        onClick={() => props.increment(configName)}
        className="fa-solid fa-arrow-up"></i>
    </div>
  );
}

export default Config;
