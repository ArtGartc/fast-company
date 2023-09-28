import React from "react"
import Qualities from "./qualities"

const QualitiesList = ({ qualities }) => {
  return qualities.map((quality) => {
    return <Qualities key={quality._id} quality={quality} />
  })
}

export default QualitiesList
