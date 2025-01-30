import React, { useState } from 'react'
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';
import Upcoming from '../../component/Upcoming';

function TradeHistories() {
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
        <TopHeader pageTitle='Trade History' handleToggle={handleToggle}/>
    </div>
          <Upcoming/>
        </div>
        </div>
        </div>
      )
}

export default TradeHistories
