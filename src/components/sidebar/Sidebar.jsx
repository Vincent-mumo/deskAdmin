import "./Sidebar.scss"
import Home from "../../images/home.png"
import employees from "../../images/employees.png"
import customers from "../../images/customers.png"
import products from "../../images/products.png"
import orders from "../../images/orders.png"
import expenses from '../../images/expenses.png'
import transactions from "../../images/transactions.png"
import logout from "../../images/logout.png"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"

const Sidebar = () => {
 const navigate = useNavigate()
 const {dispatch} = useContext(AuthContext)

  const handleLogout =  () => {
    dispatch({type:"LOGOUT"})
  };



  return (
    <div className='sidebar'>
      <Link to ="/" className="link">
      <div className="list active">
        <img src={Home} alt=""/>
        <span>Home</span>
      </div>
      </Link>
      <Link to ="/employees" className="link">
       <div className="list">
        <img src={employees} alt="" />
        <span>Staff</span>
       </div>
      </Link>
      <Link to ="/customers" className="link">
       <div className="list">
        <img src={customers} alt="" />
        <span>Users</span>
       </div>
      </Link>
      <Link to ="/orders" className="link">
       <div className="list">
        <img src={orders} alt="" />
        <span>Tickets</span>
       </div>
       </Link>
      <div className="list" onClick={handleLogout}>
        <img src={logout} alt="" />
        <span>Logout</span>
      </div>
    </div>
  )
}

export default Sidebar