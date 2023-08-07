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
  
  //orderId
  const orderId = order._id
  const id = order.customerId
  

  //fetching the products in an order using their productIds
  const products = useSelector((state) => state.product.products);
  const productIds = order.products.map(item => item.productId);
  const filteredProducts = products.filter(product => productIds.includes(product._id));

   
   const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      status: status,
    };
    const id = orderId;
    updateOrder(id, updatedOrder, dispatch);
    closed()
  };

  //fetching customer who made order from db
  useEffect(() => {
    const fetchCustomer = async () => {
      try{
        const res = await adminRequests.get(`/customers/${id}`)
        setCustomer(res.data)
      }catch{}
    }
    fetchCustomer()
  },[id])


  

  return (
    <div className='vieworder'>
      <div className="viewTop">
        <h1>order data</h1>
        <img src={cancel2} alt="" onClick={closed}/>
      </div>
      <div className="viewBottom">
        <div className="left">
          <div className="data">
            <span>OrderId:</span>
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
            <span>Phone No:</span>
            <span>{customer.phoneNo}</span>
          </div>
          <div className="data">
            <span>Quantity:</span>
            <span>{order.products.length}</span>
          </div>
          <div className="data">
            <span>Total:</span>
            <span>Ksh {order.amount}</span>
          </div>
        </div>
        <div className="right">
         <h5>Details of the products in the order</h5>
         <div className="allProducts">
          {filteredProducts.map((product) =>(
            <div className="singleProduct">
            <img src={product.image} alt="" />
            <div className="desc">
              <span>Name</span>
              <span>{product.name}</span>
            </div>
            <div className="desc">
              <span>Type</span>
              <span>{product.type}</span>
            </div>
            <div className="desc">
              <span>Category</span>
              <span>{product.category}</span>
            </div>
            <div className="desc">
              <span>Size</span>
              <span>{product.size}</span>
            </div>
            <div className="desc">
              <span>Color</span>
              <span>{product.color}</span>
            </div>
            <div className="desc">
              <span>Price</span>
              <span>ksh {product.price}</span>
            </div>
          </div>
          ))}
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