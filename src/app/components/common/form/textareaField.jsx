const TextareaField = ({ value, name, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <textarea
      className="form-control"
      placeholder="Leave a comment here"
      id="floatingTextarea"
      value={value}
      name={name}
      onChange={handleChange}
    />
  )
}

export default TextareaField
