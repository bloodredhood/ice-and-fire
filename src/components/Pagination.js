import React from "react";
import "./Pagination.css"

const Pagination = ({ currentPage, setCurrentPage, lastPageNumber, setIsLoading}) => {
  let styling
  if (currentPage === 1) {
    styling = ["paginationBtnInactive", "paginationBtn"]
  } else if (currentPage === lastPageNumber) {
    styling = ["paginationBtn", "paginationBtnInactive"]
  } else {
    styling = ["paginationBtn", "paginationBtn"]
  }


  return (
    <div className="pagination">
      <div className={styling[0]} onClick={(e) => {
        if (currentPage !== 1) {
          setCurrentPage(1)
          setIsLoading(true)
        }
      }}>First page</div>
      <div className={styling[0]} onClick={(e) => {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1)
          setIsLoading(true)
        }
      }}>Previous page</div>
      <div className={styling[1]} onClick={(e) => {
        if (currentPage !== lastPageNumber) {
          setCurrentPage(currentPage + 1)
          setIsLoading(true)
        }
      }}>Next page</div>
      <div className={styling[1]} onClick={(e) => {
        if (currentPage !== lastPageNumber) {
          setCurrentPage(lastPageNumber)
          setIsLoading(true)
        }
      }}>Last page</div>
    </div>
  )
}

export default Pagination