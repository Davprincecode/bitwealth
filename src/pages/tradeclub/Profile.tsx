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

function Profile() {
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

  return (
    <div>
      
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Profile' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

       <div className="profileWrapper">
        <div className="profileContainer">
            <div className="profileName">
                <h1>Obafemi David adeniyi</h1>
                <p>membership : <span>trade club</span></p>
            </div>
            <div className="profileImage">
                <img src={profile} alt="" />
            </div>
            <div className="upandedit">
               <div className="profileUpload">
                upload an image
            </div> 
            <div className="editProfile">
                <NavLink to="#">
                   edit profile < span> <FaEdit /> </span> 
                </NavLink>
            </div> 
            </div>
            

            <div className="profileDetails">
               <div className="prd">
                <p>email : </p>
                <p>obafemi david</p>
               </div>
               <div className="prd">
                <p>mobile : </p>
                <p>08138457885</p>
               </div>
               <div className="prd">
                <p>country : </p>
                <p>nigeria</p>
               </div>
               <div className="prd">
                <p>dob : </p>
                <p>18-01-1994</p>
               </div>
               <div className="prd">
                <p>subscription date : </p>
                <p>18-01-2025</p>
               </div>
               <div className="prd">
                <p>expire date : </p>
                <p>18-01-2026</p>
               </div>
            </div>
           
           <div className="profileBiostatus">
             <NavLink to="#">
              <div className="kycStatus">
                <div className="kycName">
                  kyc status
                </div>
                <div className="kycIcon">
                   <MdVerified />
                    <div className="ver">
                        verified
                    </div> 
                   {/* <GoUnverified /> */}
                </div>
              </div>  
             </NavLink>
              
             <NavLink to="#">

                <div className="paymentstatus">
                <div className="paymentName">
                    subscription
                </div>
                <div className="paymenticon">
                 
                   <MdVerifiedUser />
                    <div className="pay">
                        subscribed
                    </div>
                   {/* <IoIosWarning /> */}
                </div>
              </div>
            </NavLink>
              
           </div>

        </div>

        <div className="profileBio">
           
        </div>

       </div>
    </div>
{/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default Profile
