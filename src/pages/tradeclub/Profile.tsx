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
  const [loading, setLoading] = useState<boolean>(false);

  const {baseUrl, token, fullName, kycStatus, paymentStatus, membership, image_url, phoneNumber, dob, email, country, setImage_url} = userAuth();
  
  const handleToggle = () => {
      setNavBar(!navBar);
    };

  const  handleUploadImg = async(imgFile: FileList | null) => {
  
    setLoading(true);
    const formData = new FormData();

        formData.append('profileImg', imgFile![0]);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    };
      try {
        const response = await fetch(`${baseUrl}/profileImg`, requestOptions);
       
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
      
        setImage_url(result.data.profileImage);
        toast.success("Profile Image Uploaded");
        
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred.');
        }
      }
    


   }
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
            <div className="profileNamee">
                <h1>{fullName}</h1>
                <p>membership : <span>{membership}</span></p>
            </div>
            <div className="profileImage">
                <img src={image_url ? image_url :profile} alt="" />
            </div>
            <div className="upandedit">
              


<label htmlFor="file-input" style={{
  backgroundColor: '#00308f',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer'
}}>

  {
    loading ? "loading....." : "Upload Image"
  }
 
  <input type="file" id="file-input" onChange={(e) => {handleUploadImg(e.target.files)}} style={{ display: 'none' }} />
</label>
            <div className="editProfile">
                <NavLink to="/editprofile">
                   edit profile < span> <FaEdit /> </span> 
                </NavLink>
            </div> 
            </div>
            

            <div className="profileDetails">
               <div className="prd">
                <p>Name : </p>
                <p>{fullName}</p>
               </div>
               <div className="prd">
                <p>email : </p>
                <p>{email}</p>
               </div>
               <div className="prd">
                <p>mobile : </p>
                <p>{phoneNumber}</p>
               </div>
               <div className="prd">
                <p>country : </p>
                <p>{country}</p>
               </div>
               <div className="prd">
                <p>dob : </p>
                <p>{dob}</p>
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

              <NavLink to={kycStatus === null ? "/kycverification" : "#"}>
              <div className="kycStatus">
                <div className="kycName">
                  kyc status 
                </div>

                {
                    (kycStatus === 'pending' || !kycStatus || kycStatus === 'rejected') && (
                    <div className="kycIcon">
                    <GoUnverified />
                    <div className="ver">
                    {kycStatus === null ? "unverified" : kycStatus}
                    </div>
                    </div>
                    )
                }

              {
                   kycStatus === 'approved' &&  (
                    <div className="kycIcon">
                   <MdVerified />
                    <div className="ver">
                    verified
                    </div> 
                    </div>
                    )
              }    

              </div>  
             </NavLink>
              
             <NavLink to={paymentStatus === null ? "/subscriptionpayment" : "#"} >
                
                <div className="paymentstatus">
                <div className="paymentName">
                    subscription
                </div>
                  {
                    (paymentStatus === 'pending' || !paymentStatus || paymentStatus === 'rejected') && (
                      <div className="paymenticon">
                      <IoIosWarning />
                      <div className="pay">
                      {paymentStatus === null ? "Not Subscribed" : paymentStatus}
                      </div>
                      </div>
                    )
                  }

                  {
                    paymentStatus == "approved" && (
                      <div className="paymenticon">
                       <MdVerifiedUser />
                      <div className="pay">
                       subscribed
                      </div>
                      </div>
                    )
                  }
                


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
