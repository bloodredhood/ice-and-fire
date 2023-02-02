import React, { useEffect, useState } from "react";
import CultureInput from "../../components/CultureInput";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";
import Char from "./Char";
import rs from "./Char.module.css"
import s from "./TableOfChars.module.css"

const TableOfChars = () => {
  const [selectedPageSize, setSelectedPageSize] = useState(10)
  const [fetchedPage, setFetchedPage] = useState([1, 10, "Any", ""])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [gender, setGender] = useState("Any")
  const [culture, setCulture] = useState('')

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

  let lastPageNumber
  if (pageSize === 10) {
    lastPageNumber = 214
  } else if (pageSize === 25) {
    lastPageNumber = 86
  } else if (pageSize === 50) {
    lastPageNumber = 43
  }

  const fetchChars = async (currentPage, pageSize, gender, culture) => {
    const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=${pageSize}&gender=${gender}&culture=${culture}`)
    const data = await response.json()
    console.log(data)
    const result = data.map(item => {
      let name, alive, gender, culture, allegiances, numberOfBooks

      //forming name
      if (item.name !== "" && item.aliases[0] !== "") {
        name = name = `${item.name}${item.aliases.map(el => `, ${el}`).join("")}`
      } else if (item.name !== "" && item.aliases[0] === "") {
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
        let age
        const yearOfDeath = item.died.match(/\d+/g)
        const yearOfBorn = item.born.match(/\d+/g)
        if (yearOfBorn === null) {
          alive = "No, died"
        } else if (yearOfBorn.length > 1) {
          age = `${yearOfDeath - yearOfBorn[1]} - ${yearOfDeath - yearOfBorn[0]}`
          alive = `No, died at ${age} years old`
        } else {
          age = yearOfDeath - yearOfBorn[0]
          alive = `No, died at ${age} years old`
        }

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
    setFetchedPage([currentPage, pageSize, gender, culture])
  }

  useEffect(() => {

    if (selectedPageSize === 10) {
      setPageSize(10)
    } else if (selectedPageSize === 25) {
      setPageSize(25)
    } else if (selectedPageSize === 50) {
      setPageSize(50)

    }

    if (chars.length <= 1) {
      fetchChars(currentPage, pageSize, gender, culture)
    }

    if (currentPage !== fetchedPage[0] || pageSize !== fetchedPage[1] || gender !== fetchedPage[2] || culture !== fetchedPage[3]) {
      fetchChars(currentPage, pageSize, gender, culture)
    }
  }, [selectedPageSize, chars, currentPage, pageSize, gender, culture, fetchedPage])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div><h3>Ice and Fire characters</h3></div>
        <h3 className={s.showPage}>Page {currentPage}</h3>
        <div className={s.dropdownContainer}>
          <p className={s.dropdownText}>show results by</p>
          <Dropdown selected={selectedPageSize} setSelected={setSelectedPageSize} role={"pages"} />
        </div>
      </div>
      <div className={s.selectOptions}>
        <div className={s.dropdownContainer}>
          <p className={s.dropdownText}>select gender</p>
          <Dropdown selected={gender} setSelected={setGender} role={"gender"} />
        </div>
        <div className={s.dropdownContainer}>
          <p className={s.dropdownText}>culture</p>
          <CultureInput setCulture={setCulture}/>
        </div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPageNumber={lastPageNumber}/>
      <div className={s.tableWrapper}>
        <div className={s.wholeTable}>
          <div className={rs.tableRow} >
            <div className={`${rs.cell} ${rs.name} ${s.thead}`}>Character</div>
            <div className={`${rs.cell} ${rs.alive} ${s.thead}`}>Alive</div>
            <div className={`${rs.cell} ${rs.gender} ${s.thead}`}>Gender</div>
            <div className={`${rs.cell} ${rs.culture} ${s.thead}`}>Culture</div>
            <div className={`${rs.cell} ${rs.allegiances} ${s.thead}`}>Allegiance</div>
            <div className={`${rs.cell} ${rs.numOfBooks} ${s.thead}`}># of Books</div>
          </div>
          <div>
            {chars.map((char, idx) => {
              return (
                <Char key={idx} char={char} />
              )
              // }
            })}
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPageNumber={lastPageNumber} />
    </div>
  )
}

export default TableOfChars