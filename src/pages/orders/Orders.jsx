import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Orders.scss"
import { DataGrid } from "@mui/x-data-grid"
import ViewOrder from "../../components/vieworder/ViewOrder"
import {useDispatch, useSelector} from "react-redux"
import { getOrders } from "../../redux/apiCalls"

const Orders = () => {
  //open createorder
  const [openOrder,setOpenOrder] = useState(false)
  const [openView,setOpenView] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null);
 

 //fetch orders from store
 const orders = useSelector((state) => state.order.orders)
 const dispatch = useDispatch()

 //getting number of orders
 const number = orders.length

 //calculating sum of all orders
 // Function to calculate the sum of amounts
function calculateTotalAmount(orders) {
  let total = 0;
  for (const order of orders) {
    total += order.amount;
  }
  return total;
}

// Call the function and store the result
const totalAmount = calculateTotalAmount(orders);


  //fetching products
  useEffect(() => {
     getOrders(dispatch)
  },[dispatch])

  
 //closing order in create component
 const close = () => {
  setOpenOrder(!openOrder)
 }

  //closing vieworder in view component
  const closed = () => {
    setOpenView(!openView)
   }

 
  //columns for data grid
  const columns = [
    {field:"_id",headerName:"Ticket ID",width:290},
    //{field:"products",headerName:"Products",width:190},
    {field:"userId",headerName:"user ID",width:290},
    {field:"type",headerName:"Ticket Type",width:140},
    {field:"date",headerName:"Received On",width:200,renderCell:(params)=>{
      //converting createdAt date to the exact date
      const createdAt = new Date(params.row.createdAt);
     const currentDate = new Date();
    // Calculate the difference in milliseconds between the current date and the createdAt date
    const timeDifference = currentDate - createdAt;
   // Convert the time difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
   //Format the createdAt date using toLocaleDateString()
    const formattedDate = createdAt.toLocaleDateString();
      return(
        <span>{formattedDate}</span>
      )
    }}, 
    {field:"action",headerName:"Action",width:100,renderCell:(params)=> {
      const order = params.row;
      return (
        <button className="button" onClick={() => {
          setSelectedOrder(order);
          setOpenView(!openView);
        }}>View</button>
      );
    }}

  ]

  return (
    <div className='orders'>
      <div className="top">
        <Link to="/"><button>Go Back</button></Link>
      </div>
      <div className="center">
        <div className="component">
          <h1>tickets created by admin</h1>
          <div className="no">
            <span>No:</span>
            <span>0</span>
          </div>
          
        </div>
        <div className="component">
          <h1>tickets from main application</h1>
          <div className="no">
            <span>No:</span>
            <span>{number}</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h1>All Tickets</h1>
      <DataGrid
       {...orders}
       initialState={{
         ...orders.initialState,
         pagination: { paginationModel: { pageSize: 5 } },
       }}
       pageSizeOptions={[5, 10, 25]}
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
      />
      </div>
      {openView && selectedOrder && (<ViewOrder order={selectedOrder} closed={closed} />)}
    </div>
  )
}

export default Orders