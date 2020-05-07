import React from 'react';

export default (props) => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]*12.5}%`,
          bottom: `${dot[1]*12.5}%`,
        }
        return (
          <div className={`snake-dot ${i + 1 === props.snakeDots.length ? 'head' : ''}`} key={i} style={style}></div>
        )
      })}
    </div>
  )
}