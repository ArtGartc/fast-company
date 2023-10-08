const SelectField = ({ label, onChange, name, data, optionData, error }) => {
  const getInvalid = () => {
    return "form-select " + (error ? "is-invalid" : "")
  }
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInvalid()}
        id="validationCustom04"
        onChange={onChange}
        name={name}
        defaultValue=""
        required
      >
        <option disabled value="">
          Choose...
        </option>
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
