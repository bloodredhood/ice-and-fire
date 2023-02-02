import React, { useState } from "react";
import "./PagesDropdown.css"
import "./GenderDropdown.css"

const Dropdown = ({ selected, setSelected, role }) => {
  const [isActive, setIsActive] = useState(false)
  let options, styles
  if (role === "pages") {
    options = [10, 25, 50]
    styles = ["dropdown", "dropdown-btn", "dropdown-content", "dropdown-item"]
  } else if (role === "gender") {
    options = ["Any", "Male", "Female"]
    styles = ["dropdowng", "dropdown-btng", "dropdown-contentg", "dropdown-itemg"]
  }
  return (
    <div className={styles[0]}>
      <div className={styles[1]} onClick={(e) => setIsActive(!isActive)}>
        {selected}
      </div>
      {isActive && (
        <div className={styles[2]}>
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                setSelected(option)
                setIsActive(false)
              }}
              className={styles[3]}
            >{option}</div>
          ))}
        </div>
      )
      }
    </div>
  )
}

export default Dropdown