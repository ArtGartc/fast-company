import { useState } from "react"

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleChangeShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const getInvalid = () => {
    return "form-control " + (error ? "is-invalid" : "")
  }
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : type}
          id={name}
          className={" form-control " + getInvalid()}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleChangeShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  )
}

export default TextField
