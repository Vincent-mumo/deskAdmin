import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import "./SingleEmployee.scss"
import { useDispatch, useSelector } from "react-redux"
import { updateEmployee } from "../../redux/apiCalls"
import axios from "axios"

const SingleEmployee = () => {
  const [inputs,setInputs] = useState({})
  const navigate = useNavigate()
  //uploading an image
  const [file,setFile] = useState("")
  //using location hook to extract product id from current url
  const location = useLocation()
  const employeeId = location.pathname.split("/")[2]
  

  //getting a product from store
  const employee = useSelector((state) => state.employee.employees.find((employee) => employee._id === employeeId))
  const dispatch = useDispatch()
  

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
               updateEmployee(employeeId,employee, dispatch);
               navigate("/employees")
        
            }catch(err){
              console.log(err)
            }
  
      }else{
        updateEmployee(employeeId,employee, dispatch);
        navigate("/employees")
      }
  }

  




  return (
    <div className="singleemployee">
      <div className="top">
        <h1>Edit employee data</h1>
        <Link to="/employees"><button>Go Back</button></Link>
      </div>
      <div className="center">
        <div className="left">
          <div className="leftTop">
            <img src={employee.img} alt="" />
            <div className="employeeData">
              <span>{employee.username}</span>
              <span>{employee.occupation}</span>
            </div>
          </div>
          <div className="leftBottom">
            <div className="data">
              <span>Full Name:</span>
              <span>{employee.username}</span>
            </div>
            <div className="data">
              <span>Gender:</span>
              <span>{employee.gender}</span>
            </div>
            <div className="data">
              <span>Department:</span>
              <span>{employee.department}</span>
            </div>
            <div className="data">
              <span>Password:</span>
              <span>Password</span>
            </div>
            <div className="data">
              <span>Address:</span>
              <span>{employee.address}</span>
            </div>
            <div className="data">
              <span>Contact:</span>
              <span>{employee.contact}</span>
            </div>
            <div className="data">
              <span>Email:</span>
              <span>{employee.email}</span>
            </div>
            <div className="data">
              <span>isAdmin:</span>
              <span>{employee.isAdmin}</span>
            </div>
          </div>
        </div>
        <div className="right">
          <h1>Edit Data</h1>
          <form>
            <div className="formLeft">
              <div className="data">
                <label>Full Name:</label>
                <input type="text" name="username" placeholder={employee.username} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Gender:</label>
                <input type="text" name="gender" placeholder={employee.gender} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Department:</label>
                <input type="text" name="occupation" placeholder={employee.department} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Password:</label>
                <input type="text"  name="password" placeholder="Password" onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Address:</label>
                <input type="text" name="nationalID" placeholder={employee.address} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Contact:</label>
                <input type="text"  name="phoneNo" placeholder={employee.contact} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Email:</label>
                <input type="text"  name="email" placeholder={employee.email} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>isAdmin:</label>
                <input type="text"  name="isAdmin" placeholder={employee.isAdmin} onChange={handleChange}/>
              </div>
            </div>
            <div className="formRight">
              <div className="upload">
                 <img src={file ? URL.createObjectURL(file) : employee.img} alt="" />
                 <label htmlFor="file">click to upload</label>
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

export default SingleEmployee