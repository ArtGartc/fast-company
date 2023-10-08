import { useState } from "react"

const textField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleChangeShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const getInvalid = () => {
    return "form-control " + (error ? "is-invalid" : "")
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
          onChange={onChange}
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

export default textField
