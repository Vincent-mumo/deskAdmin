import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NewCustomer.scss"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { createCustomer } from "../../redux/apiCalls"
import app from "../../firebase"
import {useDispatch} from "react-redux"

const NewCustomer = () => {
  //uploading image
  const [file,setFile] = useState(null)
  const [inputs, setInputs] = useState({ from: 'admin' });
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
          const customer = { ...inputs, img: downloadURL};
          createCustomer(customer, dispatch);
          navigate("/customers")
        });
      }
    );
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
              <label>Phone No</label>
              <input type="text" placeholder="enter phone" name="phoneNo" onChange={handleChange}/>
            </div>
            <input type="hidden" name="from" value={inputs.from}/>
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