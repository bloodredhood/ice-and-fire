import React, { useState, useEffect } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import "./HousePage.css"

const HousePage = ({ name }) => {

  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [house, setHouse] = useState(["", "", "", "", "", "", "", ""])

  const fetchHouse = async (id) => {
    const response = await fetch(`https://anapioficeandfire.com/api/houses/${id}`)
    const data = await response.json()
    console.log(data)

    //set region
    let region
    if (data.region !== "") {
      region = data.region
    } else {
      region = "unknown"
    }

    //set coat of arms
    let coa
    if (data.coatOfArms !== "") {
      coa = data.coatOfArms
    } else {
      coa = "no Coat of Arms"
    }

    //set words
    let words
    if (data.words !== "") {
      words = data.words
    } else {
      words = "no words"
    }

    //set titles
    let titles
    if (data.titles.length > 1) {
      titles = data.titles.join(', ')
    } else if (data.titles.length === 1 && data.titles[0] !== "") {
      titles = data.titles[0]
    } else {
      titles = "no titles"
    }

    //set seats
    let seats
    if (data.seats.length > 1) {
      seats = data.seats.join(', ')
    } else if (data.seats.length === 1 && data.seats[0] !== "") {
      seats = data.seats[0]
    } else {
      seats = "no seats"
    }

    //set died out
    let diedOut
    if (data.diedOut === "") {
      diedOut = "unknown"
    } else {
      diedOut = data.diedOut
    }

    //set overlord
    let overlord
    if (data.overlord === "") {
      overlord = "no"
    } else {
      overlord = "yes"
    }

    const usefulData = [
      data.name, region, coa, words, titles, seats, diedOut, overlord, data.cadetBranches.length
    ]
    setLoaded(true)
    setHouse(usefulData)
  }

  useEffect(() => {
    if (!loaded) {
      fetchHouse(id)
    }
  }, [loaded, id])

  return (

    <div className="houseWrapper">
      <div className="houseName"><h1>{house[0]}</h1></div>
      <div className="region"><h3>region: </h3>{house[1]}</div>
      <div className="coa"><h3>Coat of Arms: </h3>{house[2]}</div>
      <div className="words"><h3>Words: </h3>{house[3]}</div>
      <div className="titles"><h3>Titles: </h3>{house[4]}</div>
      <div className="seats"><h3>Seats: </h3>{house[5]}</div>
      <div className="diedOut"><h3>Has died out: </h3>{house[6] === "" ? "unknown" : house[6]}</div>
      <div className="overlord"><h3>Has overlord: </h3>{house[7]}</div>
      <div className="cadet"><h3>Number of Cadet Branches: </h3>{house[8]}</div>
      <div className="backBtn"><NavLink to={"/"}>back to characters table</NavLink></div>
    </div>
  )
}

export default HousePage