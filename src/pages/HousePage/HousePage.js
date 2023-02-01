import React from "react";
import { useParams } from "react-router-dom";

const HousePage = ({name}) => {
  
  const {id} = useParams()

  return(
    <>
    house page {id}
    </>
  )
}

export default HousePage