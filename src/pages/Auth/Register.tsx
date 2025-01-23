import { useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { ImCheckmark } from 'react-icons/im';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [otherName, setOtherName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [membership, setMembership] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl} = userAuth();  

  const [age, setAge] = useState(19);

  const calculateAge = (dobDate: Date | null) => {
    if (!dobDate) return;
  
    const birthDate = dobDate;
    const currentDate = new Date();
    const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  
    if (currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      setAge(ageInYears - 1);
    } else {
      setAge(ageInYears);
    }
  
    if (ageInYears >= 18) {
      setDob(dobDate);
    } 
  };

  const handleLogin = async () => {
    setLoading(true);
    const raw = {
      'surname' : surname,
      'otherName' : otherName,
      'email' : email,
      'phoneNumber' : phoneNumber,
      'dob' : dob,
      'membership' :  membership,
      'password' : password,
      'role' : "admin"
    };
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
  
    try {
      const response = await fetch(`${baseUrl}/signupuser`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      setLoading(false);

    // if(responseJson.data.userRole === "manager"){
    //   toast.success("Logged in successfully!");
    //   loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
    //   logInUser();
    //   navigate("/mg-dashboard");
    // }
    // if(responseJson.data.userRole === "procurement"){
    //   toast.success("Logged in successfully!");
    //   loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
    //   logInUser();
    //   navigate("/pr-dashboard");
    // }
    
    // if(responseJson.data.userRole === "shopPos"){
    //   toast.success("Logged in successfully!");
    //   loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
    //   logInUser();
    //   navigate("/pos-dashboard");
    // }

    // if(responseJson.data.userRole === "warehouse"){
    //   toast.success("Logged in successfully!");
    //   loginAuth(responseJson.data.userId, responseJson.data.email, responseJson.token, responseJson.data.userRole, responseJson.data.fullName, responseJson.data.phoneNumber);
    //   logInUser();
    //   navigate("/warehouse-dashboard");
    // }

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
                    <label >surname</label>
                    <input type="text" placeholder='surname'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >other name</label>
                    <input type="text" placeholder='other name'
                     value={otherName} onChange={(e) => setOtherName(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >email</label>
                    <input type="email" placeholder='email'
                     value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >phone number</label>
                    <input type="number" placeholder='phone number'
                     value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >date of birth</label>
                    <input 
                      type="date" 
                      placeholder='date of birth'
                      value={dob ? dob.toISOString().split('T')[0] : ''}
                      onChange={(e) => calculateAge(e.target.valueAsDate)}
                    />
                   {
                    age < 18 ? (
                     <p>Your age ({age}) is not allowed to register with us.</p>
                    ) : (
                        ' '
                    )
                   }     
                </div>
              

               <div className="input">
                <label >membership</label>
                <select value={membership} onChange={(e) => setMembership(e.target.value)}>
                  <option value="">select membership</option>
                  <option value="hedge fund">hedge fund</option>
                  <option value="trade club">trade club</option>
                </select>
               </div>

                <div className="input">
                <label >password</label>
                <input type="password" placeholder='password'
                value={password} onChange={(e) => setPassword(e.target.value)}
                required/>
                </div>

                
                <div className="agreementflex">
                <input 
                    type="checkbox" 
                    checked={acceptTerm} 
                    onChange={(e) => setAcceptTerm(e.target.checked)} 
                  />

                  <div className="termfooter">
                 <p>I have agree to the <NavLink to="/term">terms & condition</NavLink> and <NavLink to="/disclamer">Disclaimer</NavLink> of BitwealthCapital.</p>
                 </div>
                 
                </div>

                <div className="input">
                <div className="btn">
                {
                  surname && otherName && email && membership && password && age >= 18 && acceptTerm ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Loading......' : 'Sign Up'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading......' : 'Sign Up'}
                    </button>
                  )
              }
                </div>
                </div>
                
                <div className="belowbtn">
                    <p className="text-center">
                    Already have an account?   
                    <span> <NavLink className="btn-link text-primary" to="/register">sign in</NavLink></span>
                    </p> 
                </div>
              

            </form>
        </div>
        </div>
     {
       loading ? (
        <div className="registrationPop">
        <div className="registration">
          <div className="regIconFlex">
            <div className="regIcon">
            <ImCheckmark />
          </div>
          </div>
          
          <div className="regContent">
            <p>
              A verification link has been sent to your registered email address. Please check your inbox or spam and click on the link to verify your account.
            </p>
          </div>
        </div>
     </div>
       ) : (
        ' '
       )
     }
     

    </div>
  )
}

export default Register




