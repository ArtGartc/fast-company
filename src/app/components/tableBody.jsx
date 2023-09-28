import React from "react"
import _ from "lodash"
import { Link } from "react-router-dom"
const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (column == "name") {
      console.log(_.get(item, columns[column]?.path))
      return (
        <Link to={`/users/${item._id}`}>
          {_.get(item, columns[column]?.path)}
        </Link>
      )
    }
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === "function") return component(item)
      return component
    }

    return _.get(item, columns[column]?.path)
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <th key={column}>{renderContent(item, column)}</th>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
