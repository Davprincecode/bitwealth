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
      loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.token);
      logInUser();
      navigate("/admin-dashboard");
    }

    if(result.data.userRole === "trade club"){
      toast.success("Logged in successfully!");
      loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.token);
      logInUser();
      navigate("/trade-dashboard");
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


