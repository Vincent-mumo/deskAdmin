import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import "./SingleCustomer.scss"
import {updateCustomer} from "../../redux/apiCalls"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import app from "../../firebase"

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

   //sending data to db
   const handleClick = (e) => {
    e.preventDefault();
    if (!file) {
      // No file selected, handle form submission without changing the image
      const customer = { ...inputs }
      const id = customerId; 
      // Use inputs directly or modify as needed
      updateCustomer(id,customer,dispatch)
      navigate("/customers")
      return; // Early return to exit the function  
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          updateProduct(customerId,customer,dispatch);
        });
      }
    );
  };
 
 

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
                <span>{customer.phoneNo}</span>
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
                <span>Phone No:</span>
                <span>{customer.phoneNo}</span>
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
                  <label>Phone No:</label>
                  <input type="text" placeholder={customer.phoneNo} name="phoneNo" onChange={handleChange}/>
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