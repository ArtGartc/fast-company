import { useState } from "react"
import TextField from "../components/textField"
import { useEffect } from "react"
import validator from "../utils/validator"

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const config = {
    email: {
      isRequired: {
        message: "Почта обязательна к заполнению"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен к заполнению"
      }
    }
  }
  const handleChange = ({ target }) => {
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
  useEffect(() => {
    validate()
  }, [data])
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email: "
        name="email"
        type="text"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password: "
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button className="border border-black">Submit</button>
    </form>
  )
}

export default Login
