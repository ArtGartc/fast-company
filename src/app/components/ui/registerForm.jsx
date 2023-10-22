import { useState } from "react"
import TextField from "../common/form/textField"
import { useEffect } from "react"
import validator from "../../utils/validator"
import API from "./../../api/index"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiFormField from "../common/form/multiFormField"
import CheckboxField from "../common/form/checkboxField"

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: "",
    license: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState()

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data))
    API.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

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
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите профессию"
      }
    },
    license: {
      isRequired: {
        message:
          "Для использование приложения нужно согласие с пользовательским соглашением"
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
      <SelectField
        label="Professions"
        onChange={handleChange}
        name="profession"
        data={data}
        optionData={professions}
        error={errors.profession}
      />
      <RadioField
        onChange={handleChange}
        value={data.sex}
        name="sex"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        label="Выберите ваш пол"
      />
      <div className="mb-4">
        {qualities && (
          <MultiFormField
            options={qualities}
            onChange={handleChange}
            name="qualities"
            label="Выберите ваши профессии"
            defaultValue={data.qualities}
          />
        )}
      </div>
      <CheckboxField
        onChange={handleChange}
        value={data.license}
        name="license"
        error={errors.license}
      >
        Согласен с <a>пользовательским соглашением</a>
      </CheckboxField>
      <button className="btn btn-primary" disabled={!isLocked}>
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
