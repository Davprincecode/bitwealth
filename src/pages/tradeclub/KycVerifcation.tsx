import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoIosWarning, IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ImBackward2, ImForward3 } from 'react-icons/im';
import profile  from '../../assets/images/profile.jpg'
import { MdOutlineVerifiedUser, MdVerified, MdVerifiedUser } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Country from '../Auth/Country';




interface productsInterface { 
  status :  string;
  asset :  string;
currentPrice :  string;
date :  string;
duration :  string;
entryPrice :  string;
leverage :  string;
marketCodition :  string;
projectedDateOfClosure :  string;
recommendedPositionSize :  string;
riskLevel :  string;
signalMessage :  string;
stopLoss :  string;
takeProfit1 :  string;
takeProfit2 :  string;
takeProfit3 :  string;
time :  string;
timeFrame :  string;
tradeId :  string;
tradeType :  string;
trailingStopLoss :  string;
}

function KycVerification() {

    const [email, setEmail] = useState<string>('');
   
    const [surname, setSurname] = useState<string>('');
    const [otherName, setOtherName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    
    const [dob, setDob] = useState<Date | null>(null);
    const [membership, setMembership] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    
  
    const [age, setAge] = useState(19);
  const [navBar, setNavBar] = useState<boolean>(false); 
  const [products, setProducts] = useState<productsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token} = userAuth();
  
  const handleToggle = () => {
      setNavBar(!navBar);
    };

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          try {
            const response = await fetch(`${baseUrl}/getsignal`, requestOptions);
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
            const result = await response.json();
            setProducts(result.data);
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
  
    //   fetchData();
    }, []);

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


  return (
    <div>
      
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='kyc verification' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

       

            <div className="formWrapper userProfile">
             <div className="formCon">
            <form>
                <div className="input">
                    <label >Means Of Identification</label>
                    <input type="file" placeholder='Means Of Identification'
                     value={surname} onChange={(e) => setSurname(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >Full address</label>
                    <input type="text" placeholder='Full address'
                     value={otherName} onChange={(e) => setOtherName(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >Proof Of Address</label>
                    <input type="file" placeholder='Proof of address'
                     value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                </div>



                <div className="input">
                    <label >Binance Api Key</label>
                    <input type="text" placeholder='Binance Api Key'
                   />
                </div>
                <div className="input">
                    <label >Okx Api Key</label>
                    <input type="text" placeholder='Okx Api Key'
                   />
                </div>

            
              



                <div className="input">
                <div className="btn">
                {
                  surname && otherName && email && membership && phoneNumber && country &&  age >= 18  ? (
                    <button  disabled={loading}>
                      {loading ? 'Loading......' : 'Edit Profile'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading......' : 'Edit Profile'}
                    </button>
                  )
              }
                </div>
                </div>
            </form>
            </div>
            </div>

       
    </div>
{/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default KycVerification
