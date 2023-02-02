import React from "react";
import s from "./Char.module.css"
import { NavLink } from "react-router-dom";

const Char = ({char}) => {
  return (
    <div className={s.tableRow}>
      <div className={`${s.cell} ${s.name}`}>{char.character}</div>
      <div className={`${s.cell} ${s.alive}`}>{char.alive}</div>
      <div className={`${s.cell} ${s.gender}`}>{char.gender}</div>
      <div className={`${s.cell} ${s.culture}`}>{char.culture}</div>
      <div className={`${s.cell} ${s.allegiances}`}>
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
      <div className={`${s.cell} ${s.numOfBooks}`}>{char.numberOfBooks}</div>
    </div>
  )
}

export default Char