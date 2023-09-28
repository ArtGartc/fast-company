import React from "react"

const Qualities = ({ quality }) => {
  return (
    <span key={quality._id} className={"badge bg-" + quality.color}>
      {quality.name}
    </span>
  )
}

export default Qualities
