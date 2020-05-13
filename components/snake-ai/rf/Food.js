import React from 'react';

export default (props) => {
  return (
    <div className="snake-food" style={{left: `${props.dot[0]*12.5}%`,bottom: `${props.dot[1]*12.5}%`}}></div>
  )
}