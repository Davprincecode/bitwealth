import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { ImCheckmark } from 'react-icons/im';
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';


function CreateSignal() {
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
      const response = await fetch(`${baseUrl}/signupuser`, requestOptions);
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
      <TopHeader pageTitle='create signal' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
     <div className="formWrapper">
<div className="formCon">
        <form>
            {/* date and time */}

                <div className="input">
                    <label >asset</label>
                    <input type="text" placeholder='asset'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >trade type</label>
                    <input type="text" placeholder='trade type'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>
            
                <div className="input">
                    <label >timeframe</label>
                    <input type="text" placeholder='time frame'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >risk level</label>
                    <input type="text" placeholder='risk level'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >current proc</label>
                    <input type="text" placeholder='currect proc'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>


                <div className="input">
                    <label >entry price</label>
                    <input type="text" placeholder='entry price'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >stop loss</label>
                    <input type="text" placeholder='stop loss'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >take profit 1</label>
                    <input type="text" placeholder='take profit 1'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >take profit 2</label>
                    <input type="text" placeholder='take profit 2'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >take profit 3</label>
                    <input type="text" placeholder='take profit 3'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >market condition</label>
                    <input type="text" placeholder='market condition'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >date to trade</label>
                    <input type="text" placeholder='date to trade'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >signal message</label>
                    <input type="text" placeholder='signal message'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>


                




                
            
                <div className="input">
                <div className="btn">
                {
                  surname && otherName && email && membership && phoneNumber && country && password && matchPassword &&  age >= 18 && acceptTerm ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Loading......' : 'Send signal'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading......' : 'Send signal'}
                    </button>
                  )
              }
                </div>
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

export default CreateSignal
