import "./Navbar.scss"
import logo from "../../images/luku.png"
import admin from "../../images/admin.png"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"

const Navbar = () => {
 
  const {user} = useContext(AuthContext)
  


  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="" />
        <h1>Luhuhub Admin</h1>
      </div>
      <div className="right">
        <span>{user.username}</span>
        <img src={user.image} alt="" />
      </div>
    </div>
  )
}

export default Navbar