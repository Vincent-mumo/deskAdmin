import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import "./SingleEmployee.scss"
import { useDispatch, useSelector } from "react-redux"
import { updateEmployee } from "../../redux/apiCalls"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import app from "../../firebase"

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

  //sending data to db
  const handleClick = (e) => {
    e.preventDefault()
    if(!file){
      //no file has been selected submit data without changing image
      const employee = {...inputs}
      const id = employeeId
      updateEmployee(id,employee,dispatch)
      navigate("/employees")
      //early return to exit the function
      return
    }

    //if the image is being changed we have to sent it to firebase
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

   // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
       uploadTask.on("state_changed",(snapshot)=> {
          //Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
       },
       (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const employee = { ...inputs, image: downloadURL};
          updateEmployee(employeeId,employee,dispatch);
          navigate("/employees")
        });
      }
    ); 
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
            <img src={employee.image} alt="" />
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
              <span>Occupation:</span>
              <span>{employee.occupation}</span>
            </div>
            <div className="data">
              <span>Salary:</span>
              <span>Ksh {employee.salary}</span>
            </div>
            <div className="data">
              <span>Password:</span>
              <span>Password</span>
            </div>
            <div className="data">
              <span>National ID:</span>
              <span>{employee.nationalID}</span>
            </div>
            <div className="data">
              <span>Phone No:</span>
              <span>{employee.phoneNo}</span>
            </div>
            <div className="data">
              <span>Email:</span>
              <span>{employee.email}</span>
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
                <label>Occupation:</label>
                <input type="text" name="occupation" placeholder={employee.occupation} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Password:</label>
                <input type="text"  name="password" placeholder="Password" onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Salary:</label>
                <input type="number" name="salary" placeholder={employee.salary} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>National ID:</label>
                <input type="text" name="nationalID" placeholder={employee.nationalID} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Phone:</label>
                <input type="text"  name="phoneNo" placeholder={employee.phoneNo} onChange={handleChange}/>
              </div>
              <div className="data">
                <label>Email:</label>
                <input type="text"  name="email" placeholder={employee.email} onChange={handleChange}/>
              </div>
            </div>
            <div className="formRight">
              <div className="upload">
                 <img src={file ? URL.createObjectURL(file) : employee.image} alt="" />
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