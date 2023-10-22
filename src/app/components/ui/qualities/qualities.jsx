import React from "react"

const Qualities = ({ quality, className }) => {
  return (
    <span
      key={quality._id}
      className={"badge bg-" + quality.color + " " + className}
    >
      {quality.name}
    </span>
  )
}

export default Qualities
