import React, { useEffect, useState } from 'react'
import SideMenu from '../../../component/SideMenu'
import TopHeader from '../../../component/TopHeader'
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { NavLink, useParams } from 'react-router-dom';

interface wallet{
  balance : string,
walletId: string,
walletName : string
}

function UserWalletTradeHistory() {
    const [userWallet, setUserWallet] = useState<wallet[]>([]);
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(0);
    const {baseUrl, token} = userAuth();
    
    const handleToggle = () => {
        setNavBar(!navBar);
      };


      const { userId } = useParams();
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
              const response = await fetch(`${baseUrl}/wallet/${userId}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json(); 
              setUserWallet(result.data);
              setBalance(result.total_balance); 
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
                          <h1>{balance} <span> USDT</span></h1>  
                        </div>

                        <div className="tradeOverview">
                        {/* /${userId} */}
                            <div className="trade">
                                <NavLink to={`/spot-history/${userId}`}> Spot </NavLink>
                            </div>
                            <div className="trade">
                                <NavLink to={`/future-history/${userId}`}> Future </NavLink>
                            </div>
                        </div>
                        
                     </div>

                     <div className="estimateDeposit">
                        <div className="btnFlex">
                            <div className="payButton">
                                <NavLink to={`/deposit-history/${userId}`}>
                                    deposit history
                                </NavLink>
                            </div>
                            <div className="payButton">
                                <NavLink to={`/withdraw-history/${userId}`}>
                                    withdraw history
                                </NavLink>
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
                                <th>Wallet Name</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody >
                              {
                                 loading ? (
                                  <tr>
                                    <td colSpan={7} className='emptyTd'>Loading....</td>
                                </tr>
                            ) : (
                              userWallet.length > 0 ? (
                                 userWallet.map((data, index)=>(
                                    <tr key={index}>
                                      <td>{data.walletName}</td>
                                      <td>{data.balance}</td>
                                    </tr> 
                                )) 
                                ) : (
                                  <tr>
                                    <td colSpan={7} className='emptyTd'>No wallet fund</td>
                                  </tr>
                                )
                                )
                              }        
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
