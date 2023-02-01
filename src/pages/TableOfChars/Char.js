import React from "react";
import s from "./Char.module.css"
import { NavLink } from "react-router-dom";

const Char = ({char}) => {
  return (
    <tr className={s.tableRow}>
      <td className={`${s.cell} ${s.name}`}>{char.character}</td>
      <td className={`${s.cell} ${s.alive}`}>{char.alive}</td>
      <td className={`${s.cell} ${s.gender}`}>{char.gender}</td>
      <td className={`${s.cell} ${s.culture}`}>{char.culture}</td>
      <td className={`${s.cell} ${s.allegiances}`}>
        {typeof (char.allegiances) !== "string"
          ? char.allegiances.map(el => {
            return <NavLink key={el.name} to={`houses/${el}`}>{el}</NavLink>
          })
          : char.allegiances
        }
      </td>
      <td className={`${s.cell} ${s.numOfBooks}`}>{char.numberOfBooks}</td>
    </tr>
  )
}

export default Char