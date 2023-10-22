import Select from "react-select"
const MultiFormField = ({ options, onChange, name, label, defaultValue }) => {
  const arrayOptions =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName]?.name,
          value: options[optionName]?._id
        }))
      : options
  const handleChange = (e) => {
    onChange({ name: name, value: e })
  }
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        isMulti
        name={name}
        options={arrayOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </>
  )
}

export default MultiFormField
