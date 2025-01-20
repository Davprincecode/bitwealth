import React from 'react'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import { FiAlignRight } from 'react-icons/fi'

function LandingPageHeader() {
  return (
    <div>
      <div className="headingCon">

       <div className="headerLogo">
        <img src={logo} alt="" />
       </div>

        <div className="headermenu">
            <ul>
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

            <div className="auth">
                <div className="loginauth">
                  <NavLink to="#">login</NavLink>  
                </div>
                <div className="signupauth">
                <NavLink to="#">sign up</NavLink>  
                </div>
            </div>
{/* onClick={handleToggle} */}
            <p className='landingBarMenu'>
              <FiAlignRight />
            </p>

        </div>
         

      </div>
    </div>
  )
}

export default LandingPageHeader
