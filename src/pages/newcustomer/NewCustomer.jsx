import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NewCustomer.scss"
import { createCustomer } from "../../redux/apiCalls"
import {useDispatch} from "react-redux"
import axios from "axios"

const NewCustomer = () => {
  //uploading image
  const [file,setFile] = useState(null)
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //handling input changes
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
               createCustomer(customer, dispatch);
               navigate("/customers")
        
            }catch(err){
              console.log(err)
            }
  
      }else{
        createCustomer(customer, dispatch);
        navigate("/customers")
      }
  }


  return (
    <div className="newcustomer">
      <div className="top">
        <h1>Create Customer</h1>
        <Link to="/customers"><button>Go Back</button></Link>
      </div>
      <div className="bottom">
        <form onSubmit={handleClick}>
          <div className="left">
            <div className="data">
              <label>Username</label>
              <input type="text" placeholder="username" name="username" onChange={handleChange} />
            </div>
            <div className="data">
              <label>password</label>
              <input type="password" placeholder="enter password" name="password" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Contact</label>
              <input type="text" placeholder="enter contact" name="contact" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Address</label>
              <input type="text" placeholder="enter address" name="address" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Email</label>
              <input type="email" placeholder="enter email" name="email" onChange={handleChange}/>
            </div>
          </div>
          <div className="right">
            <div className="upload">
              <img src={file ? URL.createObjectURL(file) : "https://images.pexels.com/photos/15424312/pexels-photo-15424312.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
              <label htmlFor="file">click here to upload</label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewCustomer