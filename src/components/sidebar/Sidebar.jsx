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
import {adminRequests} from "../../utils/requestMethods"

const Sidebar = () => {
 const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await adminRequests.post("/employeesAuth/logout");
      localStorage.setItem("user", null);
      navigate("/login")
       window.location.reload();
    } catch (err) {
      console.log(err);
    }
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
        <span>Employees</span>
       </div>
      </Link>
      <Link to ="/customers" className="link">
       <div className="list">
        <img src={customers} alt="" />
        <span>Customers</span>
       </div>
      </Link>
      <Link to ="/products" className="link">
       <div className="list">
        <img src={products} alt="" />
        <span>Products</span>
       </div>
      </Link>
      <Link to ="/orders" className="link">
       <div className="list">
        <img src={orders} alt="" />
        <span>Orders</span>
       </div>
       </Link>
       <Link to ="/expenses" className="link">
       <div className="list">
        <img src={expenses} alt="" />
        <span>Expenses</span>
       </div>
       </Link>
       <Link to ="/transactions" className="link">
        <div className="list">
         <img src={transactions} alt="" />
         <span>Transactions</span>
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