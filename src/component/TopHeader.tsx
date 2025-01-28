import React, { useState } from 'react'
import { userAuth } from '../pages/context/AuthContext'
import { IoIosArrowBack, IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import profile  from '../assets/images/profile.jpg'
import { FiAlignRight } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { GoUnverified } from 'react-icons/go'

interface modalPopUp {
    pageTitle : string,
    handleToggle : () => void;
}

const TopHeader : React.FC<modalPopUp> = ({pageTitle, handleToggle}) => {
    const {baseUrl, token, fullName, kycStatus, image_url} = userAuth();
    
    const [navBar, setNavBar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
       
    <div className="topHeader desktopview"> 
    <div className="backArrow">
        <NavLink to="">
            <FaArrowLeft />
        </NavLink>
       </div>      
    <div className="pageTitle">
        <h4>{pageTitle}</h4> 
    </div>
    <div className="prnot">
        {/* <div className="not">
        <NavLink to="">
            <IoIosNotificationsOutline />
        </NavLink>
            <div className="dot"></div>
        </div> */}
        <div className="profile">
      <div className="profileImgCon">
      <div className="profileImg">
                <img src={ image_url ? image_url :  profile} alt="Profile Picture" />
                </div>
                {
                    kycStatus == '0' && (
                        <div className="prfunverified">
                        <GoUnverified />
                        </div> 
                    )
                }
                {
                    kycStatus == '1' && (
                        <div className="prfverified">
                        <MdVerified />
                        </div>
                    )
                }
    </div>
            

            <div className="profileName">
                <p className="surName">
                   {fullName}
                </p>
            </div>
        </div>
    </div>

    </div>

{/* ===============mobile view========= */}

<div className="topHeader mobileview">
       <div className="backArrow">
        <NavLink to="">
            <FaArrowLeft />
        </NavLink>
       </div>
        <div className="pageTitle">
           <h4>{pageTitle}</h4> 
        </div>

        <div className="prnot">
            {/* <div className="not">
        <NavLink to="">
            <IoIosNotificationsOutline />
        </NavLink>
              <div className="dot"></div>
            </div>
             */}
            <p className='barMenu' onClick={handleToggle}>
              <FiAlignRight />
            </p>
        </div>
       </div>

{/* ============= mobile profile =================== */}
       <div className='mobileProfile'>
       <div className="profile">
             <div className="profileImgCon">
                <div className="profileImg">
                <img src={ image_url ? image_url :  profile} alt="Profile Picture" />
                </div>
                {
                    kycStatus == '0' && (
                        <div className="prfunverified">
                        <GoUnverified />
                        </div> 
                    )
                }
                {
                    kycStatus == '1' && (
                        <div className="prfverified">
                        <MdVerified />
                        </div>
                    )
                }
                
            </div>
                <div className="profileName">
                <p className="surName">
                   {fullName}
                </p>
                </div>
            </div>
       </div>

{/* ===============mobile view end========= */}


    </div>
  )
}

export default TopHeader
