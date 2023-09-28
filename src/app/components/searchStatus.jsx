import React from "react"
import PropTypes from "prop-types"

const renderPhrase = (length) => {
  if (length > 4) return "человек тусанёт"
  if (length > 1) return "человека тусанёт"
  return "человек тусанёт"
}
const SearchStatus = ({ length }) => {
  return (
    <>
      {length !== 0 ? (
        <h1>
          <span className="badge bg-primary">
            {length} {renderPhrase(length)} c тобой сегодня
          </span>
        </h1>
      ) : (
        <h1>
          <span className="badge bg-warning">Не с кем тусануть</span>
        </h1>
      )}
    </>
  )
}
export default SearchStatus

SearchStatus.prototypes = {
  length: PropTypes.number
}
