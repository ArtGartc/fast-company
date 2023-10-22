const CheckboxField = ({ children, onChange, value, name, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value })
  }
  const getInvalid = () => {
    return "form-check-input " + (error ? "is-invalid" : "")
  }
  return (
    <div className="form-check mb-4">
      <input
        className={getInvalid()}
        type="checkbox"
        value=""
        id={name}
        checked={value}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

export default CheckboxField
