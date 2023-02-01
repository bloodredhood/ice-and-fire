import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./TableOfChars.module.css"

const TableOfChars = () => {
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
  }, [])

  return (
    <>
      {chars.map(char => {
        return (
          <div className={s.tableItem}>
            <div className={s.cell}>{char.character}</div>
            <div className={s.cell}>{char.alive}</div>
            <div className={s.cell}>{char.gender}</div>
            <div className={s.cell}>{char.culture}</div>
            <div className={s.cell}>
              {typeof(char.allegiances) !== "string"
               ?char.allegiances.map(el => {
                return <NavLink to={`houses/${el}`}>{el}</NavLink>
                })
               : char.allegiances
              }
            </div>
            <div className={s.cell}>{char.numberOfBooks}</div>
          </div>
        )
      })}
    </>
  )
}

export default TableOfChars