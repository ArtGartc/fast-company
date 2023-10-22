import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../../../api"
import TextField from "./../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiFormField from "../../common/form/multiFormField"
const UserEditPage = () => {
  const [user, setUser] = useState()
  const params = useParams()
  const { userId } = params
  const [qualities, setQualities] = useState()
  const [professions, setProfessions] = useState()

  useEffect(() => {
    API.users
      .getById(userId)
      .then(({ qualities, ...data }) =>
        setUser({ ...data, qualities: getQualitiesOfUser(qualities) })
      )
    API.qualities.fetchAll().then((data) => setQualities(data))
    API.professions.fetchAll().then((data) => setProfessions(data))
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    API.users.update(userId, {
      ...user,
      profession: getProfessionOnId(),
      qualities: getQualitiesOnId(user.qualities)
    })
  }
  const getProfessionOnId = () => {
    let profesiya
    for (let profession in professions) {
      if (
        professions[profession]._id == user.profession?._id ||
        professions[profession]._id == user.profession
      )
        profesiya = professions[profession]
    }
    return profesiya
  }
  const getQualitiesOfUser = (qualities) => {
    const qualitiesList = qualities.map((quality) => ({
      label: quality.name,
      value: quality._id
    }))
    return qualitiesList
  }
  const getQualitiesOnId = (elements) => {
    const userQuality = []
    for (let element in elements)
      for (let quality in qualities) {
        if (elements[element].value == qualities[quality]._id) {
          userQuality.push(qualities[quality])
        }
      }

    return userQuality
  }
  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  console.log(user)
  return user && qualities && professions ? (
    <div className="container mt-5">
      <div className="row">
        <div className="offset-md-3 col-md-6 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              // error={errors.email}
            />
            <TextField
              label="Email "
              name="email"
              type="text"
              value={user.email}
              onChange={handleChange}
              // error={errors.email}
            />
            <TextField
              label="Совершенно встреч "
              name="completedMeetings"
              type="number"
              value={user.completedMeetings}
              onChange={handleChange}
              // error={errors.password}
            />
            <TextField
              label="Оценка"
              name="rate"
              type="number"
              value={user.rate}
              onChange={handleChange}
              // error={errors.password}
            />
            <SelectField
              label="Профессия"
              onChange={handleChange}
              name="profession"
              data={user}
              optionData={professions}
              value={user.profession?._id}
              // error={errors.profession}
            />
            <RadioField
              onChange={handleChange}
              value={user.sex}
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
                  label="Выберите ваши качества"
                  defaultValue={user.qualities}
                />
              )}
            </div>

            <button className="btn btn-primary">Подтвердить</button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  )
}

export default UserEditPage
