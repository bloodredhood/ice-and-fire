import React from "react";
import "./Pagination.css"

const Pagination = ({ currentPage, setCurrentPage, lastPageNumber }) => {

  return (
    <div className="pagination">
      <div className="pagination-btn" onClick={(e) => setCurrentPage(1)}>First page</div>
      <div className="pagination-btn" onClick={(e) => setCurrentPage(currentPage - 1)}>Previous page</div>
      
      <div className="pagination-btn" onClick={(e) => setCurrentPage(currentPage + 1)}>Next page</div>
      <div className="pagination-btn" onClick={(e) => setCurrentPage(lastPageNumber)}>Last page</div>
    </div>
  )
}

export default Pagination