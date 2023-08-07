import { useContext, useState } from "react"
import "./Login.scss"  
import {AuthContext} from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"
import {adminRequests} from "../../utils/requestMethods"


const Login = () => {
  const [credentials,setCredentials] = useState({
    email:undefined,
    password:undefined
  })

  const {loading,error,dispatch} = useContext(AuthContext)

  const navigate = useNavigate()

  //handling the changes in input as typed by user
  const handleChange = (e) => {
    e.preventDefault()
    setCredentials((prev) => ({...prev,[e.target.id]:e.target.value}))
  }

  //handling the login process
  const handleClick = async (e) => {
     e.preventDefault()
     dispatch({type:"LOGIN_START"})
     try{

      const res = await adminRequests.post("staffAuth/login",credentials)
      if(res.data.isAdmin){
        dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
        navigate("/")

      }else{
        dispatch({type:"LOGIN_FAILURE",payload:{message:"you are not allowed"}})
      }


     }catch(err){
      dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
     }
  }
 





  return (
    <div className="login">
        <form>
          <h5>welcome to the selfHelp desk admin dashboard enter credentials to continue</h5>
            <div className="data">
                <label> Email</label>
                <input type="text" id="email" placeholder="enter username" required  onChange={handleChange}/>
            </div>
            <div className="data">
                <label>Password</label>
                <input type="password" id="password" placeholder="enter password" required onChange={handleChange}/>
            </div>
            <button disabled={loading} onClick={handleClick}>Login</button>
            {error && <span>{error.message}</span>}
        </form>
    </div>
  )
}

export default Login