import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';

function ChangePassword() {
  
  const [password, setPassword] = useState<string>('');
  const [confirmpassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [matchPassword, setMatchPassword] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const { token } = useParams();
  const tokens = `Bearer ${token}`;

  const {baseUrl} = userAuth();  

  const handleLogin = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", tokens);
    const raw = {
      "newPassword": password
    };  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/changepassword`, requestOptions);
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
  
  useEffect(() => {
    if (password === confirmpassword) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [confirmpassword, password]);

const handleConfirmPassword = (eventPassword: string) => {
    setConfirmPassword(eventPassword);
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
            <h2>Change your password</h2>
          </div>
            <form>
                <div className="input">
                    <label>Enter New Password</label>
                    <input type="password" placeholder='enter new password'
                     value={password} onChange={(e) => setPassword(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label>Confirm Password</label>
                    <input type="password" placeholder='confirm password'
                     value={confirmpassword} onChange={(e) => handleConfirmPassword(e.target.value)}
                   />
                </div>
                {
                    confirmpassword && matchPassword == false ? (
                      <p>password does not match</p> 
                    ) : (
                        ' '
                    )
                }
                <div className="input">
                <div className="btn">
                {
                  password && matchPassword ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Loading....' : 'Change Password'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading....' : 'Change Password'}
                    </button>
                  )
              }
                </div>
                </div>
                 {
                    changed && (
                        <div className="passwordChange">
                        <p>
                        Your password change successfully! click on the link bellow to login
                        </p>
                        <NavLink to="/login">
                        click here
                        </NavLink>
                        </div>  
                    )
                 }
            </form>
        </div>
        </div>
    </div>
  )
}

export default ChangePassword


