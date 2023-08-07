import "./ViewOrder.scss"
import cancel2 from "../../images/cancel2.png"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateOrder } from "../../redux/apiCalls"
import {useNavigate} from "react-router-dom"
import { adminRequests } from "../../utils/requestMethods"

const ViewOrder = ({closed,order}) => {
  const [status,setStatus] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [customer,setCustomer] = useState({})
  const [adminNotes,setAdminNotes] = useState("")
  
  //orderId
  const orderId = order._id
  const id = order.userId
  
console.log(order)
   
   const handleChange = (event) => {
    setStatus(event.target.value)
  };

  const handleAdminNotes = (event) => {
    setAdminNotes(event.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      status: status,
      adminNotes: adminNotes
    };
    const id = orderId;
    updateOrder(id, updatedOrder, dispatch);
    closed()
  };

  //fetching customer who made order from db
  useEffect(() => {
    const fetchCustomer = async () => {
      try{
        const res = await adminRequests.get(`/users/${id}`)
        setCustomer(res.data)
      }catch{}
    }
    fetchCustomer()
  },[id])


  

  return (
    <div className='vieworder'>
      <div className="viewTop">
        <h1>ticket data</h1>
        <img src={cancel2} alt="" onClick={closed}/>
      </div>
      <div className="viewBottom">
        <div className="left">
          <div className="data">
            <span>ticketId:</span>
            <span>{order._id}</span>
          </div>
          <div className="data">
            <span>Created by:</span>
            <div className="creator">
              <span>{customer?.username}</span>
              <img src={customer.img} alt="" />
            </div>
          </div>
          <div className="data">
            <span>Contact:</span>
            <span>{customer.contact}</span>
          </div>
          <div className="data">
            <span>Address:</span>
            <span>{customer.address}</span>
          </div>
          <div className="data">
            <span>Email:</span>
            <span>{customer.email}</span>
          </div>
        </div>
        <div className="right">
         <h5>Details of the ticket</h5>
         <div className="status">
              <span>Department</span>
             <h3>{order.department}</h3>
         </div>
         <div className="status">
              <span>Subject</span>
             <h3>{order.subject}</h3>
         </div>
         <div className="status">
              <span>Who is resposible?</span>
             <h3>{order.responsible}</h3>
         </div>
         <div className="status">
              <span>Ticket Description</span>
             <h3>{order.desc}</h3>
         </div>
         <div className="status">
         <span>Admin notes:</span>
          <form action="" >
            <textarea type="text" cols="35" rows="6" className="notes" placeholder="add admin notes here"
            onChange={handleAdminNotes}
            />
          </form>
         </div>
          <div className="status">
            <span>Status:</span>
            <select name="status" onChange={handleChange}>
              <option value="Pending">{order.status}</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <button onClick={handleClick}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default ViewOrder