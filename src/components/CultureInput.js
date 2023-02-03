import React, { useState } from "react";
import "./CultureInput.css"

const CultureInput = ({ setCulture, setCurrentPage, setIsLoading }) => {
  const [value, setValue] = useState("")

  const data = ["Andal", "Asshai", "Astapori", "Braavosi", "Crannogmen", "Dornish", "Dothraki", "First Men", "Free Folk", "Ghiscari", "Ibbenese", "Ironborn", "Lhazareen", "Lysene", "Meereenese", "Mountain clans", "Myrish", "Northern mountain clans", "Northmen", "Norvoshi", "Pentoshi", "Qartheen", "Qohor", "Reach", "Rhoynar", "Rivermen", "Sistermen", "Stormlands", "Summer Isles", "Thenn", "Tyroshi", "Valemen", "Valyrian", "Westerlands", "Westerman", "Westeros"]

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <div className="container">
        <div>
          <input className="input" placeholder="write a name of culture" type="text" value={value} onChange={onChange}/>
        </div>
        <div className="dropdown-input">
          {data
            .filter(item => {
              const searchTerm = value.toLocaleLowerCase()
              const lowerCaseName = item.toLocaleLowerCase()

              return searchTerm && lowerCaseName.startsWith(searchTerm)
            })
            .map(item => <div className="dropdown-row" onClick={(e) => {
              setValue("")
              setCulture(item)
              setCurrentPage(1)
              setIsLoading(true)
            }}>{item}</div>)}
        </div>
      </div>
    </div>

  )
}

export default CultureInput