import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Char from "./Char";
import rs from "./Char.module.css"
import s from "./TableOfChars.module.css"

const TableOfChars = () => {
  const [selected, setSelected] = useState("Choose gender")
  const [chars, setChars] = useState(
    [
      {
        character: "name, aliases",
        alive: "yes",
        gender: "unknown",
        culture: "unknown",
        allegiances: "no allegiances",
        numberOfBooks: 0
      }
    ]
  )

  const fetchChars = async () => {
    const response = await fetch("https://anapioficeandfire.com/api/characters")
    const data = await response.json()
    console.log(data)
    const result = data.map(item => {
      let name, alive, gender, culture, allegiances, numberOfBooks

      //forming name
      if (item.name !== "" && item.aliases.length !== 0) {
        name = name = `${item.name}${item.aliases.map(el => `, ${el}`).join("")}`
      } else if (item.name !== "" && item.aliases.length === 0) {
        name = item.name
      } else if (item.name === "" && item.aliases.length !== 0) {
        name = item.aliases.map((el, idx) => {
          if (idx === item.aliases.length - 1) {
            return `${el}`
          } else {
            return `${el}, `
          }
        }).join("")
      } else {
        name = "No name"
      }

      //forming alive
      if (item.born !== "" && item.died !== "") {
        alive = `No, died at ${item.died.match(/\d+/g) - item.born.match(/\d+/g)} years old`
      } else if (item.born === "" && item.died !== "") {
        alive = `No, died in year ${item.died.match(/\d+/g)}`
      } else {
        alive = "Yes"
      }

      //forming gender
      if (item.gender !== "") {
        gender = item.gender
      } else {
        gender = "Unknown"
      }

      //forming culture
      if (item.culture !== "") {
        culture = item.culture
      } else {
        culture = "Unknown"
      }

      //forming allegiances
      if (item.allegiances.length > 0) {
        allegiances = item.allegiances.map(el => el.match(el.match(/\d+/g)))
      } else {
        allegiances = "No allegiances"
      }

      //forming numberOfBooks
      if (item.books.length > 0) {
        numberOfBooks = item.books.length
      } else {
        numberOfBooks = 0
      }

      return {
        character: name,
        alive: alive,
        gender: gender,
        culture: culture,
        allegiances: allegiances,
        numberOfBooks: numberOfBooks
      }
    }
    )
    setChars(result)
  }

  useEffect(() => {
    if (chars.length < 10) {
      fetchChars()
    }
  }, [chars.length])


  return (
    <div className={s.container}>
      <div>
        <div></div>
        <h1>Ice and Fire character table</h1>
        <Dropdown selected={selected} setSelected={setSelected}/>
      </div>
      <div className={s.tableWrapper}>
        <table className={s.wholeTable}>
          <thead className={rs.tableRow} >
            <th scope="colgroup" className={`${rs.cell} ${rs.name} ${s.thead}`}>Character</th>
            <th scope="colgroup" className={`${rs.cell} ${rs.alive} ${s.thead}`}>Alive</th>
            <th scope="colgroup" className={`${rs.cell} ${rs.gender} ${s.thead}`}>Gender</th>
            <th scope="colgroup" className={`${rs.cell} ${rs.culture} ${s.thead}`}>Culture</th>
            <th scope="colgroup" className={`${rs.cell} ${rs.allegiances} ${s.thead}`}>Allegiance</th>
            <th scope="colgroup" className={`${rs.cell} ${rs.numOfBooks} ${s.thead}`}># of Books</th>
          </thead>
          <tbody>
            {chars.map((char, idx) => {
              return (
                <Char key={idx} char={char} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOfChars