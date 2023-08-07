import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import "./Customers.scss"
import deleted from "../../images/delete.png"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { deleteCustomer, getCustomers} from "../../redux/apiCalls"
import { userRows } from "../../data"


const Customers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //dummy data for products
  const [data,setData] = useState(userRows)
  //fetching employees from  slice in redux
  const customers = useSelector((state) => state.customer.customers)
  console.log(customers)
  const dispatch = useDispatch()

  //fetching products using apiCalls
  useEffect(() => {
    getCustomers(dispatch)
  },[dispatch])




   //function to delete
   const handleDelete = (id) => {
    deleteCustomer(id,dispatch)
  }

  
  

  //columns for datagrid
  const columns = [
    {field:"_id",headerName:"ID",width:250},
    {field:"username",headerName:"Customer Name",width:230,renderCell:(params)=> {
      return (
        <div className="customerdata">
          <img src={params.row.img} alt="" />
          {params.row.username}
        </div>
      )
    }},
    
    {field:"contact",headerName:"Contact",width:230},
    {field:"address",headerName:"Address",width:230},
    {field:"action",headerName:"Action",width:140,renderCell:(params)=> {
      return (
        <div className="viewing">
        <Link to={"/customers/" + params.row._id}>
          <button>View</button>
        </Link>
        <img src={deleted} alt="" onClick={() => handleDelete(params.row._id)} />
        </div>
      )
    }}
  ]




  return (
    <div className='customers'>
      <div className="top">
        <h1>Users</h1>
        <div className="center">
          <span>All:</span>
          <span>{customers.length}</span>
        </div>
        <Link to="/customers/new"><button>Create new User</button></Link>
      </div>
      
      <h1 className="bb">All users data.</h1>
      <DataGrid
         {...customers}
         initialState={{
           ...data.initialState,
           pagination: { paginationModel: { pageSize: 5 } },
         }}
         pageSizeOptions={[5, 10, 25]}
        rows={customers}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  )
}

export default Customers