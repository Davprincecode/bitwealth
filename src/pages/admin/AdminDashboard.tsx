import React, { useEffect, useState } from 'react'
import { FiAlignRight } from "react-icons/fi";
import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import numeral from 'numeral';
import TopHeader from '../../component/TopHeader';
import { IoIosNotifications } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import Dashboard from '../Dashboard';
import Upcoming from '../../component/Upcoming';
    

function AdminDashboard() {
    
    const [navBar, setNavBar] = useState<boolean>(false);
  

  
    const handleToggle = () => {
      setNavBar(!navBar);
    };

    return (
      <div>
        <div className="mainWrapper">
  
  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>
  
  <SideMenu navBar={navBar} handleToggle={handleToggle} />
  
  <div className="mainContainer">
  
    <div className="mainContainersHeader">
        <TopHeader pageTitle='dashboard' handleToggle={handleToggle}/>
    </div>

      
       
       {/* ==========main container wrapper ============= */}
     <div className="mainContainerWrapper">
            <div className="mainCon">

             <Dashboard />
            
         

            

            
            </div>
     </div>

         </div>
         </div>
      </div>
    )
}

export default AdminDashboard
