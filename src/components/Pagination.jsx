import React, { useEffect, useState } from 'react'

const Pagination = ({ moviePage, movieTotalPages, firstPage, prevPage, nextPage, lastPage }) => {

  return (
    <section className="pagination">
        <p className='text-white'><a onClick={firstPage}>First</a> | <a onClick={prevPage}>&#60;</a> | Page {moviePage} of {movieTotalPages > 500 ? 500 : movieTotalPages} | <a onClick={nextPage}>&#62;</a> | <a onClick={lastPage}>Last</a></p>
    </section>
  )
}

export default Pagination