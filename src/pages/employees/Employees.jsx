import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Employees.scss"
import deleted from "../../images/delete.png"
import { DataGrid } from "@mui/x-data-grid"
import {useDispatch,useSelector} from "react-redux"
import { deleteEmployee, getEmployees } from "../../redux/apiCalls"
import { adminRequests } from "../../utils/requestMethods"



const Employees = () => {
  //fetching employees from  slice in redux
  const employees = useSelector((state) => state.employee.employees)
  const dispatch = useDispatch()
  //setting gender count
  const [male,setMale] = useState(0)
  const [female,setFemale]= useState(0)


  //fetching employees using the apiCall function
  useEffect(() => {
     getEmployees(dispatch)
  },[dispatch])

  //fetching gender count
  useEffect(() => {
    const fetchGender = async () => {
      const res = await adminRequests.get("employees/count/gender")
      setMale(res.data[0].count)
      setFemale(res.data[1].count)   
    }
    fetchGender()
  },[])
  

  //function to delete
  const handleDelete = (id) => {
    deleteEmployee(id,dispatch)
  }


  //columns for datagrid
  const columns = [
    {field:"_id",headerName:"ID",width:250},
    {field:"username",headerName:"Username",width:180,renderCell:(params)=> {
      return (
        <div className="employeedata">
          <img src={params.row.image} alt="" />
          {params.row.username}
        </div>
      )
    }},
    {field:"occupation",headerName:"Occupation",width:140},
    {field:"salary",headerName:"Salary",width:100},
    {field:"phoneNo",headerName:"Phone",width:130},
    {field:"nationalID",headerName:"National ID",width:130},
    {field:"action",headerName:"Action",width:140,renderCell:(params)=> {
      return (
        <div className="viewing">
        <Link to={"/employees/" + params.row._id}>
          <button>View</button>
        </Link>
        <img src={deleted} alt="" onClick={() => handleDelete(params.row._id)} />
        </div>
      )
    }}
  ]



  return (
    <div className='employees'>
      <div className="top">
        <Link to="/"><button>Go Back</button></Link>
        <Link to="/employees/new"><button>Create new Employee</button></Link>
      </div>
      <div className="center">
        <h3>Summary</h3>
       <div className="detailsWrapper">
       <div className="details">
          <span>Male Employees</span>
          <div className="data">
            <span>No:</span>
            <span>{male}</span>
          </div>
        </div>
        <div className="details">
          <span>Female Employees</span>
          <div className="data">
            <span>No:</span>
            <span>{female}</span>
          </div>
        </div>
       </div>
      </div>
      <h1>All employees data.</h1>
      <DataGrid
        rows={employees}
        disableSelectionOnClick
        columns={columns}
        {...employees}
       initialState={{
         ...employees.initialState,
         pagination: { paginationModel: { pageSize: 5 } },
       }}
        getRowId={(row) => row._id}
        pageSize={5} paginationMode="client" pagination={true}
        checkboxSelection
      />
    </div>
  )
}

export default Employees