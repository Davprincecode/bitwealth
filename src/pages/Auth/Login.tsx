import { useState } from 'react'
import logo from '../../assets/images/johntopLogo.png';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
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
      const response = await fetch(`${baseUrl}/userlogin`, requestOptions);
      const responseJson = await response.json();
     
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      // const responseJson = await response.json();
      setLoading(false);

    if(responseJson.data.userRole === "manager"){
      toast.success("Logged in successfully!");
      loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
      logInUser();
      navigate("/mg-dashboard");
    }
    if(responseJson.data.userRole === "procurement"){
      toast.success("Logged in successfully!");
      loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
      logInUser();
      navigate("/pr-dashboard");
    }
    
    if(responseJson.data.userRole === "shopPos"){
      toast.success("Logged in successfully!");
      loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
      logInUser();
      navigate("/pos-dashboard");
    }


    if(responseJson.data.userRole === "warehouse"){
      toast.success("Logged in successfully!");
      loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
      logInUser();
      navigate("/warehouse-dashboard");
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
            <h2>welcome to Johntop Foods</h2>
            <p>please signin to dashboard</p>
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
                    <a href="">forget password</a>
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

            </form>
        </div>
        </div>
    </div>
  )
}

export default Login


