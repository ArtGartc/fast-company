const RadioField = ({ value, name, options, onChange, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor="form-label">{label}</label>
      {options.map((option) => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + "_" + option.value}
            checked={option.value == value}
            value={option.value}
            onChange={onChange}
          />
          <label
            className="form-check-label"
            htmlFor={option.name + "_" + option.value}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioField
