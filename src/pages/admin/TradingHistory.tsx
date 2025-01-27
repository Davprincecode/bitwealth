import React, { useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';

function TradingHistory() {
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
      <TopHeader pageTitle='Trading History' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
        <div className="container-fluid">
            <div className="container-header">
                 <h2>Trading History</h2>
            </div>
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr role="row">
                        <th>asset</th>
                        <th>trade type</th>
                        <th>time frame</th>
                        <th>risk level </th>
                        <th>leverage</th>
                        <th>recommended position size </th>
                        <th>duration</th>
                        <th>current price</th>
                        <th>entry price </th>
                        <th>stop loss </th>
                        <th>trailing stop loss </th>
                        <th>take profit 1 </th>
                        <th>take profit 2 </th>
                        <th>take profit 3 </th>
                        <th>market condition </th>
                        <th>signal message</th>
                        <th>date</th>
                        <th>time</th>
                        <th>projected date of closure</th>
                    </tr>
                    </thead>

                    <tbody >
                                                                
                                
                   </tbody>
                    </table> 
                </div>
                    
            </div>
        </div>
    </div>
{/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default TradingHistory
