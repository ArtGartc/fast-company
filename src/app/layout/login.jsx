import { useParams } from "react-router-dom"
import LoginForm from "../components/ui/loginForm"
import { useState } from "react"
import RegisterForm from "../components/ui/registerForm"

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type == "register" ? type : "login")
  const handleSwitchType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    )
  }
  return formType == "register" ? (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-md-3 col-md-6 shadow p-4">
            <h1 className="mb-4">Register</h1>
            <RegisterForm />
            <p>Already have acc? </p>
            <button onClick={handleSwitchType}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-md-3 col-md-6 shadow p-4">
            <h1 className="mb-4">Login</h1>
            <LoginForm />
            <p>Don't have acc? </p>
            <button onClick={handleSwitchType}>Sign up</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
