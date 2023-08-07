import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NewEmployee.scss"
import { useDispatch } from "react-redux"

import { createEmployee } from "../../redux/apiCalls"
import axios from "axios"
import { adminRequests } from "../../utils/requestMethods"

const NewEmployee = () => {
  //uploading image
  const [file,setFile] = useState("")
  const [inputs,setInputs] = useState({})
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
     const employee = { ...inputs};

    if(file){
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","upload")

        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/vmumo/image/upload",data)
            const {url} = uploadRes.data
             employee.img = url
             createEmployee(employee, dispatch);
             navigate("/employees")
      
          }catch(err){
            console.log(err)
          }

    }else{
      createEmployee(employee, dispatch);
      navigate("/employees")
    }
}



  return (
    <div className="newemployee">
      <div className="top">
         <h1>New Employee</h1>
         <Link to="/employees"><button>Go Back</button></Link>
      </div>
      <div className="bottom">
        <form>
          <div className="left">
            <div className="data">
              <label>Username:</label>
              <input type="text" name="username" onChange={handleChange} placeholder="Enter full name" />
            </div>
            <div className="data">
              <label>Gender:</label>
              <input type="text" placeholder="enter gender" name="gender" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Contact:</label>
              <input type="text" placeholder="enter contact" name="contact" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Email:</label>
              <input type="text" placeholder="enter email" name="email" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Password:</label>
              <input type="password" placeholder="enter password" name="password" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Department:</label>
              <input type="text" placeholder="Enter department" name="department" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Address:</label>
              <input type="text" placeholder="address" name="address" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>isAdmin:</label>
              <input type="text" placeholder="true/false" name="isAdmin" onChange={handleChange}/>
            </div>
          </div>
          <div className="right">
            <div className="upload">
              <img src={file ? URL.createObjectURL(file) :"https://images.pexels.com/photos/4427620/pexels-photo-4427620.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
              <label htmlFor="file">click here to upload</label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button onClick={handleClick}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewEmployee