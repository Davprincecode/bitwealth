import { useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
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
      const response = await fetch(`${baseUrl}/forgetpassword`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      toast.success(responseJson.message);
      setChanged(true);
      setLoading(false);
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
      <NavLink to="/">
        <div className="loginLogo">
            <div className="img">
                <img src={logo} alt="" />
            </div>
        </div>
        </NavLink>
     
     <div className="formWrapper">
        <div className="formCon">
          <div className="formHeader">
            <h2>Forgot your password?</h2>

            <p>Enter your email below, you will 
                receive an email with instructions on how to reset 
                your password in a few minutes.
                </p>
          </div>
            <form>
                <div className="input">
                    <label>Enter your e-mail address</label>
                    <input type="email" placeholder='enter email'
                     value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
            

                <div className="input">
                <div className="btn">
                {
                  email ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Loading...' : 'Send'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading...' : 'Send'}
                    </button>
                  )
              }
                </div>
                </div>

                {
                    changed && (
                        <div className="passwordChange">
                        <p>
                        Please check your email inbox or spam for  password change
                        </p>
                        </div>  
                    )
                 }
            </form>
        </div>
        </div>
    </div>
  )
}

export default ForgetPassword


