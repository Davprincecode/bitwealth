import React, { useState } from 'react'
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';
import Upcoming from '../../component/Upcoming';
import TradingViewNews from '../tradingViewNews';

function CryptoNews() {
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
        <TopHeader pageTitle='Trade New' handleToggle={handleToggle}/>
    </div>
    <div className="tradeNewsCon">
          <TradingViewNews />
    </div>
        </div>
        </div>
        </div>
      )
}

export default CryptoNews
