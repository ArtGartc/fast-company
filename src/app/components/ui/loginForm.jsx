import { useState } from "react"
import TextField from "../common/form/textField"
import { useEffect } from "react"
import validator from "../../utils/validator"
import CheckboxField from "../common/form/checkboxField"

const LoginField = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false })
  const [errors, setErrors] = useState({})
  const config = {
    email: {
      isRequired: {
        message: "Почта обязательна к заполнению"
      },
      isEmail: {
        message: "Почта введена не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен к заполнению"
      },
      isCapitalSymbol: {
        message: "Пароль содержать заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать цифру"
      },
      isLength: {
        message: "Длина пароля должна быть болше 8 символов",
        value: 8
      }
    }
  }
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValidate = validate()
    if (!isValidate) return
    console.log(data)
  }
  function validate() {
    const errors = validator(data, config)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isLocked = Object.keys(errors).length === 0
  useEffect(() => {
    validate()
  }, [data])
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email "
        name="email"
        type="text"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password "
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckboxField onChange={handleChange} value={data.stayOn} name="stayOn">
        Запомнить аккаунт
      </CheckboxField>
      <button className="btn btn-primary" disabled={!isLocked}>
        Submit
      </button>
    </form>
  )
}

export default LoginField
