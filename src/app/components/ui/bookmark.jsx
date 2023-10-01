import React from "react"
import PropTypes from "prop-types"

const Bookmark = ({ fill, onSwitch }) => {
  {
    if (!fill) {
      return (
        <button onClick={onSwitch}>
          <i className="bi bi-bookmarks"></i>
        </button>
      )
    } else {
      return (
        <button onClick={onSwitch}>
          <i className="bi bi-bookmarks-fill"></i>
        </button>
      )
    }
  }
}
export default Bookmark

Bookmark.propTypes = {
  fill: PropTypes.bool.isRequired,
  onSwitch: PropTypes.func.isRequired
}
