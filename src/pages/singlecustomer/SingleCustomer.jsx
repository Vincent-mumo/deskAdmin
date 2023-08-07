import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import "./SingleCustomer.scss"
import {updateCustomer} from "../../redux/apiCalls"
import axios from "axios"


const SingleCustomer = () => {
  //uploaing image
  const [file,setFile] = useState(null)
   const [inputs,setInputs] = useState({})
   const navigate = useNavigate()
   const location = useLocation()
   const customerId = location.pathname.split("/")[2]

   //getting a product from store
   const customer = useSelector((state) => state.customer.customers.find((customer) => customer._id === customerId))
   const dispatch = useDispatch()

   //function to handle changes in inputs
   const handleChange = (e) => {
    e.preventDefault()
    const {name,value} = e.target
    setInputs((prev) => {
      return {...prev,[name]:value}
    })
   }

     //function to submit post
  const handleClick = async (e) => {
    e.preventDefault()
     const customer = { ...inputs};

    if(file){
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","upload")

        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vmumo/image/upload",data)
            const {url} = uploadRes.data
            customer.img = url
             updateCustomer(customerId,customer, dispatch);
             navigate("/customers")
      
          }catch(err){
            console.log(err)
          }

    }else{
      updateCustomer(customerId,customer, dispatch);
      navigate("/customers")
    }
}
 
 

  return (
    <div className="singlecustomer">
      <div className="top">
        <h1>Customer Data</h1>
        <Link to="/customers"><button>Go Back</button></Link>
      </div>
      <div className="center">
          <div className="left">
            <div className="leftTop">
              <img src={customer.img} alt="" />
              <div className="customerData">
                <span>{customer.username}</span>
                <span>{customer.contact}</span>
              </div>
            </div>
            <div className="bottom">
              <div className="data">
                <span>Customer ID:</span>
                <span>{customer._id}</span>
              </div>
              <div className="data">
                <span>Username:</span>
                <span>{customer.username}</span>
              </div>
              <div className="data">
                <span>Password:</span>
                <span>password</span>
              </div>
              <div className="data">
                <span>Contact:</span>
                <span>{customer.contact}</span>
              </div>
              <div className="data">
                <span>Address:</span>
                <span>{customer.address}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <h1>Edit Data</h1>
            <form>
              <div className="formLeft">
                <div className="data">
                  <label>Username:</label>
                  <input type="text"  placeholder={customer.username} name="username" onChange={handleChange}/>
                </div>
                <div className="data">
                  <label>Password:</label>
                  <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                </div>
                
                <div className="data">
                  <label>Contact:</label>
                  <input type="text" placeholder={customer.contact} name="phoneNo" onChange={handleChange}/>
                </div>
                <div className="data">
                  <label>Address:</label>
                  <input type="text" placeholder={customer.address} name="phoneNo" onChange={handleChange}/>
                </div>
              </div>
              <div className="formRight">
                <div className="upload">
                  <img src={ file ? URL.createObjectURL(file) :customer.img} alt="" />
                  <label htmlFor="file">click here to upload</label>
                  <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button onClick={handleClick}>Update</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SingleCustomer