import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NewEmployee.scss"
import { useDispatch } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import app from "../../firebase"
import { createEmployee } from "../../redux/apiCalls"

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

  //sending data to db
  const handleClick = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          createEmployee(employee, dispatch);
          navigate("/employees")
        });
      }
    );
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
              <label>National ID:</label>
              <input type="text" placeholder="enter ID" name="nationalID" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Phone No:</label>
              <input type="text" placeholder="enter phone" name="phoneNo" onChange={handleChange}/>
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
              <label>Occupation:</label>
              <input type="text" placeholder="Enter occupation" name="occupation" onChange={handleChange}/>
            </div>
            <div className="data">
              <label>Salary:</label>
              <input type="number" placeholder="enter Salary" name="salary" onChange={handleChange}/>
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