import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { ImCheckmark } from 'react-icons/im';
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';


function SendEmail() {
  const navigate = useNavigate();
  const [navBar, setNavBar] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [otherName, setOtherName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [membership, setMembership] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [confirmpassword, setConfirmPassword] = useState<string>('');
  const [matchPassword, setMatchPassword] = useState<boolean>(false);
  
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl} = userAuth();  

  const [age, setAge] = useState(19);

  const handleToggle = () => {
    setNavBar(!navBar);
  };


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
      'country' : country,
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
      const response = await fetch(`${baseUrl}/senduseremail`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      setLoading(false);
      navigate("/redirectform");
      
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
    <div>
      <div className="mainWrapper">

<div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
</div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='send email' handleToggle={handleToggle}/>
  </div> 
    {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

   <div className="formWrapper">
   <div className="formCon">
        <form>
                      
                    <div className="input">
                        <label>user</label>
                        <select value={membership} onChange={(e) => setMembership(e.target.value)}>
                        <option value="">select user</option>
                        <option value="all">all</option>
                        <option value="david">david</option>
                        </select>
                    </div>
                  
                        <div className="input">
                        <label >subject</label>
                        <input type="text" name="" id="" />
                        </div>
                        
                        <div className="input">
                        <label >message</label>
                        <textarea name="" id="">

                        </textarea>
                        </div>
                    
                        
        

                        <div className="input">
                        <div className="btn">
                        {
                        surname && otherName && email && membership && phoneNumber && country && password && matchPassword &&  age >= 18 && acceptTerm ? (
                            <button onClick={handleLogin} disabled={loading}>
                            {loading ? 'Loading......' : 'Send'}
                            </button>
                        ) : (
                            <button disabled={true}>
                            {loading ? 'Loading......' : 'Send'}
                            </button>
                        )
                    }
                        </div>
                        </div>
                        
                        <div className="belowbtn">
                            <p className="text-center">
                            Already have an account?   
                            <span> <NavLink className="btn-link text-primary" to="/login">sign in</NavLink></span>
                            </p> 
                        </div>
                    

        </form>
    </div>
    </div>
   </div>


       </div>
       </div>
    </div>
  )
}

export default SendEmail
