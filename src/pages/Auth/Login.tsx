import { useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, loginAuth, logInUser} = userAuth();  

  const handleLogin = async () => {
    setLoading(true);
    const raw = {
      "email": email,
      "password": password
    };
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
  
    try {
      const response = await fetch(`${baseUrl}/signinuser`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
      setLoading(false);

    if(result.data.userRole === "admin"){
      toast.success("Logged in successfully!");
      loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.surName, result.data.otherName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.token);
      logInUser();
      navigate("/admin-dashboard");
    }

    if(result.data.userRole === "trade club"){
      toast.success("Logged in successfully!");
      loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.surName, result.data.otherName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.token);
      logInUser();
      navigate("/trade-dashboard");
    }

    if(result.data.userRole === "hedge fund"){
      toast.success("Logged in successfully!");
      loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.surName, result.data.otherName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.token);
      logInUser();
      navigate("/hedge-dashboard");
    }


    } catch (error) {
      setLoading(false);
      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };


 const testPost = async () => {

  const raw = {
'fullName' : "obafemi david",
'phoneNumber' : "033939",
'userName' : "davprince31",
'password' : "12345"
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(raw),
  };
  try {
    const response = await fetch(`${baseUrl}/addstaff`, requestOptions);
    const result = await response.text();
   console.log(result);
  } catch (error) {
    setLoading(false);
    if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred.');
    }
  }


 }

 const testGet = async () => {
  const tokens = token();
        
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", tokens);
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const response = await fetch(`${baseUrl}/staff`, requestOptions);
    const result = await response.text(); 
   console.log(result);
  } catch (error) {
    console.log(error);
  }
 }


 const token = () => {
  return "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOWY4NGVlMjAyY2U3YTJlYzQ3YWNlYTNkMzc3ZjRhZWRjZjA2ZGE3MzkyODNiODEwYTg2YmZiMWJiOTk5NmMyM2VlZWRmYTE5MDAyMDNmZDIiLCJpYXQiOjE3MzgxNTg4MDIuNzA1MjY2LCJuYmYiOjE3MzgxNTg4MDIuNzA1Mjc1LCJleHAiOjE3Njk2OTQ4MDIuNTQwNjksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.T5CA0_gsShBvFWyvC981-vep1eQlIdxaF6VywvczHkrttU0K4APb8-luqeN2xeV-cr_s5uGDd1yd8XC5RixCJ4HxNjCQ1rQMT1H7fW5QjWWQY6bXoPTbSiBHcAWgDJH8CVShPDI8P9KT5l4x6CyGb_eq-GmjeVmlgxtHG3dBCynNrtIEvZTm0Inzg4gnB1wp-i20UnmRj7xJ5j8AogveMqqntvrY9kR90wpHasFdUt_sxo3BYQkYPTK2IEILaR2vgHRUn5k0dw0uW9kSuCwa6MpUuMtk05cVzHgwOYmlJAvLjkbNofD6a0602EJEdPCgqp6DOa9jHBXWTr1_uedaokD-XYCJ6hEm2rvmTqfHR3MBr1Ca22OJRccOcL0sIu8OudmJTGMNpon2aTif8UDk-4kNdKQZam222jmD9abbDH19rY5HNTp1FurZumif9ftmeof4ZGUjfkpJ1ea7J56TEEdd__hlWjiaHLNXknsqCJixEWx-ogte6NW1JKXbeaBnTKoV0yRdD8_9ENUWV0vzCWmoFGd7DSiAoqNFpixoA54dlZHCvCsyzz8ES7_wASjsdVaBNCExfSDFdV080THWGH1NTaO8SfL-0MIv_mzq8T_m-WsXqYw1WwK4mecbLj8QpUvadYS3xU1MrljkmYwVR14JD_-ccLUbM1rmY1UgraQ";
}

  return (
    <div className='login'>
        <div className="loginLogo">
            <div className="img">
                <img src={logo} alt="" />
            </div>
        </div>
     
     <div className="formWrapper">
        <div className="formCon">
          <div className="formHeader">
            <h2>welcome to Bitwealth Capital</h2>
            <p>Sign in to your account</p>
          </div>

           {/* <div className="textGet">
            <button onClick={testGet}>test get</button>
           </div>

           <div className="textPost">
            <button onClick={testPost}>test post</button>
           </div> */}


            <form>
                <div className="input">
                    <label >email</label>
                    <input type="email" placeholder='email'
                     value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
                <div className="input">
                <label >password</label>
                <input type="password" placeholder='password'
                value={password} onChange={(e) => setPassword(e.target.value)}
                required/>
                </div>

                <div className="forgetpassword">
                    <NavLink to="/forgetpassword">forget password</NavLink>
                </div>

                <div className="input">
                <div className="btn">
                {
                  email && password ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  )
              }
                </div>
                </div>
                
                <div className="belowbtn">
                    <p className="text-center">
                      Not registered?  
                    <span> <NavLink className="btn-link text-primary" to="/register">Register</NavLink></span>
                    </p> 
                </div>
              

            </form>
        </div>
        </div>
    </div>
  )
}

export default Login


