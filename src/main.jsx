import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./app/layout/login"
import Users from "./app/layout/users"
import Main from "./app/layout/main"
import Navbar from "./app/components/ui/navbar"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "main",
        element: <Main />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "users/:userId?",
        element: <Users />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
