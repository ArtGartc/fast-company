import React from "react"

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      }))
    } else {
      onSort({ path: item, order: "asc" })
    }
  }
  const renderSortCaret = (item) => {
    if (selectedSort.path === item) {
      if (selectedSort.order === "asc")
        return <i className="bi bi-caret-down-fill"></i>
      else return <i className="bi bi-caret-up-fill"></i>
    }
    return null
  }
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() =>
              columns[column].path
                ? handleSort(columns[column].path)
                : undefined
            }
            scope="col"
          >
            {columns[column].name}
            {renderSortCaret(columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
