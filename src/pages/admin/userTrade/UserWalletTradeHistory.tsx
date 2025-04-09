import React, { useEffect, useState } from 'react'
import SideMenu from '../../../component/SideMenu'
import TopHeader from '../../../component/TopHeader'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../../context/AuthContext';
import { MdAirplanemodeActive, MdAirplanemodeInactive, MdAutoDelete, MdRestore } from 'react-icons/md';
import { toast } from 'react-toastify';
import { NavLink, useParams } from 'react-router-dom';



function UserWalletTradeHistory() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(false);
    const { userId } = useParams();
    const {baseUrl, token} = userAuth();
    
    const handleToggle = () => {
        setNavBar(!navBar);
      };

      useEffect(() => {
        const fetchData = async () => {
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
              const response = await fetch(`${baseUrl}/getalluser`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
            //   setUsers(result.data);
              setLoading(false);
            } catch (error) {
              
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  toast.error(error.message);
                } else {
                  toast.error('An unknown error occurred.');
                }
              }
          
        };
        fetchData();
      }, []);
    
  return (
    <div>
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Balance' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
       {/* ---------------------------- */}
           <div className="binanceoverrall">

                <div className="binanceBalance">
                     <div className="estimatedBalance">
                        <div className="bal">
                          <h4>Estimated balance</h4>
                          <h1>11000.300 <span> USDT</span></h1>  
                        </div>

                        <div className="tradeOverview">
                        {/* /${userId} */}
                            <div className="trade">
                                <NavLink to={`/future-history/${userId}`}> Spot </NavLink>
                            </div>
                            <div className="trade">
                                <NavLink to={`/future-history/${userId}`}> Future </NavLink>
                            </div>
                        </div>
                        
                     </div>

                     <div className="estimateDeposit">
                        <div className="btnFlex">
                            <div className="payButton">
                                deposit history
                            </div>
                            <div className="payButton">
                                withdraw history
                            </div>
                        </div>

                        <div className="duration">
                            <div className="payButton">
                                1W
                            </div>
                            <div className="payButton">
                                1M
                            </div>
                            <div className="payButton">
                                3M
                            </div>
                            <div className="payButton">
                                6M
                            </div>
                        </div>
                     </div>
                </div>
                
                <div className="assetCon">
                    <h1>My Asset</h1>
                    <div className="assetDetails">
                            <div className="tradingCon">
                            <div className="container-body">
                        <div className="table-responsive">
                            <table>
                            <thead>
                            <tr >
                                <th>Coin</th>
                                <th>Amount</th>
                                <th>Available</th> 
                                <th>Frozen</th>
                            </tr>
                            </thead>
                            <tbody >
                                <tr>
                                <td>Funding</td>
                                <td>1000</td>
                                <td>200</td>
                                <td>500</td>
                                </tr> 
                                <tr>
                                <td>Funding</td>
                                <td>1000</td>
                                <td>200</td>
                                <td>500</td>
                                </tr> 
                                <tr>
                                <td>Funding</td>
                                <td>1000</td>
                                <td>200</td>
                                <td>500</td>
                                </tr>            
                            </tbody>
                            </table> 
                        </div>
                    </div>
                            </div>
                    </div>

                </div>

           </div>
       {/* ------------------------ */}
    </div>
   {/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default UserWalletTradeHistory
