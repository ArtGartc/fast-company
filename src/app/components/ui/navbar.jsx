import { Link, Outlet } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/main" className="nav-link">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar
