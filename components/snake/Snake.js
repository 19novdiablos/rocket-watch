import React from 'react';

export default (props) => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          bottom: `${dot[1]}%`,
        }
        return (
          <div className={`snake-dot ${i + 1 === props.snakeDots.length ? 'head' : ''}`} key={i} style={style}></div>
        )
      })}
    </div>
  )
}