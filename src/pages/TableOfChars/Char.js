import React from "react";
import "./Char.css"
import { NavLink } from "react-router-dom";

const Char = ({char, colorize}) => {
  let style
  if (colorize === 1) {
    style = {backgroundColor: "rgb(220, 247, 124)"}
  } else if(colorize === 2) {
    style = {backgroundColor: "rgb(192, 218, 99)"}
  }

  return (
    <div className="tableRow" style={style}>
      <div className="cell name">{char.character}</div>
      <div className="cell alive">{char.alive}</div>
      <div className="cell gender">{char.gender}</div>
      <div className="cell culture">{char.culture}</div>
      <div className="cell allegiances">
        {typeof (char.allegiances) !== "string"
          ? char.allegiances.map((el, idx) => {
            if (idx === char.allegiances.length - 1) {
              return <div><NavLink key={idx+10} to={`houses/${el}`}>{el}</NavLink></div>
            } else {
              return <div><NavLink key={idx+10} to={`houses/${el}`}>{el}</NavLink>/</div>
            }

          })
          : char.allegiances
        }
      </div>
      <div className="cell numOfBooks">{char.numberOfBooks}</div>
    </div>
  )
}

export default Char