import React, { useEffect, useState } from "react";
import CultureInput from "../../components/CultureInput";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";
import Char from "./Char";
import "./../../components/Pagination.css"
import "./Char.css"
import "./TableOfChars.css"
import Loader from "../../components/Loader";

const TableOfChars = () => {
  const [lastPageNumber, setLastPageNumber] = useState(214)
  const [selectedPageSize, setSelectedPageSize] = useState(10)
  const [fetchedPage, setFetchedPage] = useState([1, 10, "Any", "", 214])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [gender, setGender] = useState("Any")
  const [culture, setCulture] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [chars, setChars] = useState(
    []
  )

  const fetchChars = async (currentPage, pageSize, gender, culture) => {
    const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=${pageSize}&gender=${gender}&culture=${culture}`)
    const headers = []
    response.headers.forEach(el => headers.push(String(el)))
    const number = Number(headers[1].slice(-30, -20).match(/\d+/g)[0])
    const data = await response.json()
    //console.log(data)
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
    setLastPageNumber(number)
    setTimeout(() => {
      setIsLoading(false)
    }, 200);

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
    <div className="container">
      <div className="header">
        <div><h3>Ice and Fire characters</h3></div>
        <h3 className="showPage">Page {currentPage} of {lastPageNumber}</h3>
        <div className="dropdownContainer">
          <p className="dropdownText">show results by</p>
          <Dropdown selected={selectedPageSize} setSelected={setSelectedPageSize} setCurrentPage={setCurrentPage} setIsLoading={setIsLoading} role={"pages"} />
        </div>
      </div>
      <div className="selectOptions">
        <div className="dropdownContainer">
          <p className="dropdownText">select gender</p>
          <Dropdown selected={gender} setSelected={setGender} setCurrentPage={setCurrentPage} setIsLoading={setIsLoading} role={"gender"} />
        </div>
        <div className="dropdownContainer">
          <p className="dropdownText">culture</p>
          <CultureInput setCulture={setCulture} setCurrentPage={setCurrentPage} setIsLoading={setIsLoading}/>
        </div>
        <div onClick={() => {
          setCurrentPage(1)
          setCulture('')
          setGender("Any")
          setPageSize(10)
        }}
        className="paginationBtn" >Clear filters</div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPageNumber={lastPageNumber} setIsLoading={setIsLoading}/>
      <div className="tableWrapper">
        <div className="wholeTable">
          <div className="tableRow" >
            <div className="cell name thead">Character</div>
            <div className="cell alive thead">Alive</div>
            <div className="cell gender thead">Gender</div>
            <div className="cell culture thead">Culture</div>
            <div className="cell allegiances thead">Allegiance</div>
            <div className="cell numOfBooks thead"># of Books</div>
          </div>
          <div>
            { isLoading
            ? <Loader />
            : chars.map((char, idx) => {
              if (idx%2 === 0) {
                return (
                  <Char key={idx} char={char} colorize={1} />
                )
              } else {
                return (
                  <Char key={idx} char={char} colorize={2} />
                )
              } 

            })}
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPageNumber={lastPageNumber} />
    </div>
  )
}

export default TableOfChars