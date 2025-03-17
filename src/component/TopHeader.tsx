import React, { useState } from 'react'
import { userAuth } from '../pages/context/AuthContext'
import { IoIosArrowBack, IoIosMoon, IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io'
import profile  from '../assets/images/profile.jpg'
import { FiAlignRight } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { GoUnverified } from 'react-icons/go'
import { toast } from 'react-toastify'
import { IoSunnyOutline } from 'react-icons/io5'

interface modalPopUp {
    pageTitle : string,
    handleToggle : () => void;
}

const TopHeader : React.FC<modalPopUp> = ({pageTitle, handleToggle}) => {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };

    const {baseUrl, token, fullName, kycStatus, image_url, color, setColor, role} = userAuth();
    
    const [navBar, setNavBar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const changeUserColor  = async() => {
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
      const response = await fetch(`${baseUrl}/changecolor`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
      setColor(result.color);
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
       
    <div className="topHeader desktopview"> 

    <div className="backArrow" onClick={goBack}>
        {/* <NavLink to=""> */}
            <FaArrowLeft />
        {/* </NavLink> */}
       </div>   

    <div className="pageTitle">
        <h4>{pageTitle}</h4> 
    </div>
    <div className="prnot">
                <div className="dayTimeSwitch">
                        <div className="day" onClick={changeUserColor}>
                            { 
                                color == "white" ? (
                                    loading ? "loading" : <IoSunnyOutline />
                                ) : (
                                    loading ? "loading" : <IoIosMoon /> 
                                )
                            }
                        </div>
                </div>

        <div className="profile">
            <NavLink to="/profile">
            <div className="profileImgCon">
            <div className="profileImg">
                    <img src={ image_url ? image_url :  profile} alt="Profile Picture" />
                    </div>
                    {
                        role !== "admin" && (
                            <>
                         {
                        (kycStatus === 'pending'  || !kycStatus || kycStatus === 'rejected') && (
                            <div className="prfunverified">
                            <GoUnverified />
                            </div> 
                        )
                        }
                        {
                        kycStatus === 'approved' && (
                            <div className="prfverified">
                            <MdVerified />
                            </div>
                        )
                    }   
                    </>
                        )
                    }
                    
            </div>
            <div className="profileName">
            <p className="surName">
                {fullName}
            </p>
            </div>
            </NavLink>
            
        </div>
    </div>

    </div>

{/* ===============mobile view========= */}

<div className="topHeader mobileview">
       <div className="backArrow" onClick={goBack}>
        {/* <NavLink to=""> */}
            <FaArrowLeft />
        {/* </NavLink> */}
       </div>
        <div className="pageTitle">
           <h4>{pageTitle}</h4> 
        </div>
          
        <div className="prnot">
        <div className="dayTimeSwitch">
                        <div className="day" onClick={changeUserColor}>
                            { 
                                color == "white" ? (
                                    loading ? "loading" : <IoSunnyOutline />
                                ) : (
                                    loading ? "loading" : <IoIosMoon /> 
                                )
                            }
                        </div>
                </div>

            <p className='barMenu' onClick={handleToggle}>
              <FiAlignRight />
            </p>
        </div>
       </div>

{/* ============= mobile profile =================== */}
       <div className='mobileProfile'>
       <div className="profile">

        <NavLink to="/profile">
            <div className="profileImgCon">
                <div className="profileImg">
                <img src={ image_url ? image_url :  profile} alt="Profile Picture" />
                </div>
               { role !== "admin" && (
                            <>
                {
                    (kycStatus === 'pending'  || !kycStatus || kycStatus === 'rejected') && (
                        <div className="prfunverified">
                        <GoUnverified />
                        </div> 
                    )
                }
                {
                    kycStatus === 'approved' && (
                        <div className="prfverified">
                        <MdVerified />
                        </div>
                    )
                }
                </>
                )}
            </div>
            <div className="profileName">
            <p className="surName">
                {fullName}
            </p>
            </div>
        </NavLink>
             


        </div>
       </div>

{/* ===============mobile view end========= */}


    </div>
  )
}

export default TopHeader
