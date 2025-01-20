import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { FiAlignRight } from 'react-icons/fi'

function LandingPageHeader() {

  const [mobileNav, setMobileNav] = useState(false);

  const   mobileNavToggle = () => {
    console.log("hellow orld");
    
    setMobileNav(!mobileNav);
  }

  return (
    <div>
      <div className="headingCon">

       <div className="headerLogo">
        <img src={logo} alt="" />
       </div>

        <div className="headermenu">
         <ul className={mobileNav ? 'mobileNavActive' : 'mobileNav'}>
                <li>
                    <NavLink to="">Home</NavLink>
                </li>
                <li>
                    <NavLink to="#about">About Us</NavLink>
                </li>
                <li>
                    <NavLink to="#portfolio">Portfolio</NavLink>
                </li>
                <li>
                    <NavLink to="#event">Event</NavLink>
                </li>
            </ul>

            <div className= {mobileNav ? 'mobileauthActive' : 'auth'}>
                <div className="loginauth">
                  <NavLink to="#">login</NavLink>  
                </div>
                <div className="signupauth">
                <NavLink to="#">sign up</NavLink>  
                </div>
            </div>
            <p className='landingBarMenu' onClick={mobileNavToggle}>
              <FiAlignRight />
            </p>

        </div>
         

      </div>
    </div>
  )
}

export default LandingPageHeader
