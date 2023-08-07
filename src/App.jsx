import { useContext } from 'react'
import {AuthContext} from "./context/AuthContext"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Employees from "./pages/employees/Employees"
import SingleEmployee from "./pages/singleemployee/SingleEmployee"
import NewEmployee from "./pages/newemployee/NewEmployee"
import Customers from "./pages/customers/Customers"
import SingleCustomer from "./pages/singlecustomer/SingleCustomer"
import NewCustomer from "./pages/newcustomer/NewCustomer"
import Orders from './pages/orders/Orders'
import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"

function App() {

  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)

    if(!user){
      return <Navigate to="/login"/>
    }

    return children
  }


  return (
    <div className="app">
       <BrowserRouter>
         <Routes>
           <Route path='/login' element={<Login/>}/>
         </Routes>
    <ProtectedRoute>
      <Navbar/>
     <div className="container">
      <Sidebar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employees/:employeeId' element={<SingleEmployee/>}/>
        <Route path='/employees/new' element={<NewEmployee/>}/>
        <Route path='/customers' element={<Customers/>}/>
        <Route path='/customers/:customerId' element={<SingleCustomer/>}/>
        <Route path='/customers/new' element={<NewCustomer/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
    </div>
     </ProtectedRoute>
    </BrowserRouter>
    </div>
  )
}

export default App
