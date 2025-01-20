import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { FiAlignRight } from 'react-icons/fi'

interface LandingProp {
  colorSwitchFunction: () => void;
}
const LandingPageHeader: React.FC<LandingProp> = ({ colorSwitchFunction}) =>  {

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
                <li onClick={() => handleNav('home')}>
                   Home
                </li>
                <li onClick={() => handleNav('about')}>
                    About Us
                </li>
                <li onClick={() => handleNav('portfolio')}>
                    Portfolio
                </li>
                <li onClick={() => handleNav('event')}>
                    Event
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
            {/* <div className="switchModeIcon">
              <p onClick={(event) => colorSwitchFunction}>
                a
              </p>
            </div> */}
            <p className='landingBarMenu' onClick={mobileNavToggle}>
              <FiAlignRight />
            </p>

        </div>
         

      </div>
    </div>
  )
}

export default LandingPageHeader
