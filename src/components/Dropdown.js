import React, { useState } from "react";
import s from "./Dropdown.css"

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false)
  const options = ["Any", "Male", "Female"]
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option)
                setIsActive(false)
              }}
              className="dropdown-item"
            >{option}</div>
          ))}
        </div>
      )
      }
    </div>
  )
}

export default Dropdown