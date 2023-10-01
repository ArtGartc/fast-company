import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = ({ itemsCount, pageSize, onChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <button
              className={"page-link" + (currentPage === page ? " active" : "")}
              onClick={() => onChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func
}
