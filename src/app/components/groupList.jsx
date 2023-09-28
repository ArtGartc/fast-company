import React from "react"
import PropTypes from "prop-types"

const GroupList = ({
  items,
  selectedItem,
  valueProperty,
  contentProperty,
  onClick
}) => {
  const itemsKeys = Object.keys(items)
  return (
    <ul className="list-group">
      {itemsKeys.map((item) => {
        return (
          <li
            key={items[item][valueProperty]}
            className={
              "list-group-item" +
              (selectedItem === items[item] ? " active" : "")
            }
            onClick={() => onClick(items[item])}
            role="button"
          >
            {items[item][contentProperty]}
          </li>
        )
      })}
    </ul>
  )
}
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
}
GroupList.propTypes = {
  items: PropTypes.object,
  onClick: PropTypes.func
}
export default GroupList
