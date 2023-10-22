const SelectField = ({ label, onChange, name, optionData, error, value }) => {
  const getInvalid = () => {
    return "form-select " + (error ? "is-invalid" : "")
  }
  const handleChange = ({ target }) => {
    console.log(optionData)
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInvalid()}
        id={name}
        onChange={handleChange}
        value={value}
        name={name}
        required
      >
        <option value=" ">Choose...</option>
        {optionData &&
          Object.keys(optionData).map((key) => (
            <option value={optionData[key]._id} key={optionData[key]._id}>
              {optionData[key].name}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

export default SelectField
