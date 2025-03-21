import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { FiAlignRight } from 'react-icons/fi'
import { IoSunnyOutline } from 'react-icons/io5';
import { IoIosMoon } from 'react-icons/io';
import { userAuth } from './context/AuthContext';

interface LandingProp {
  colorSwitchFunction: () => void;
  colorSwitch : string;
}
const LandingPageHeader: React.FC<LandingProp> = ({ colorSwitchFunction, colorSwitch}) =>  {
  const {loggedIn, role} = userAuth();
  const [mobileNav, setMobileNav] = useState(false);
  const   mobileNavToggle = () => { 
    setMobileNav(!mobileNav);
  }

  const handleNav = (id : string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <div className="headingCon">

       <div className="headerLogo">
        <img src={logo} alt="" />
       </div>

        <div className="headermenu">
         <ul className={mobileNav ? 'mobileNavActive' : 'mobileNav'}>
                {/* <li onClick={() => handleNav('event')}>
                    Event
                </li> */}
                <li onClick={() => handleNav('home')}>Home</li> 
                <li onClick={() => handleNav('about')}>About Us</li> 
                <li onClick={() => handleNav('portfolio')}>Performance</li> 
                <li onClick={() => handleNav('team')}>Team</li> 
                <li onClick={() => handleNav('resources')}> Educational Resources</li> 
                <li onClick={() => handleNav('faqs')}>FAQs</li> 
            </ul>

            <div className= {mobileNav ? 'mobileauthActive' : 'auth'}>
                <div className="loginauth">
                <NavLink to={ loggedIn && role == "admin" ? '/admin-dashboard' :  
                loggedIn && role == "trade club" ? "/trade-dashboard" : 
                loggedIn && role == "hedge fund" ?  "/hedge-dashboard" : "/login"
                  }>login</NavLink> 
                </div>

                <div className="signupauth">
                <NavLink to="/register">sign up</NavLink>  
                </div>
            </div>

    <div className="barAndModeCon">
      <div className="switchModeIcon" style={{color:"gray"}}  onClick={colorSwitchFunction}>
        <div className='modeIcon'>
          { 
          colorSwitch == "white" ? (
                <IoSunnyOutline />
          ) : (
              <IoIosMoon /> 
          )
          }        
        </div>
      </div>

      <div className='landingBarMenu' onClick={mobileNavToggle}>
        <FiAlignRight />
      </div>
    </div>
      
    </div>
    </div>
    </div>
  )
}

export default LandingPageHeader
