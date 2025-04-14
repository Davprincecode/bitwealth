import React, { useEffect, useState } from 'react'
import SideMenu from '../../../component/SideMenu'
import TopHeader from '../../../component/TopHeader'
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


interface depositInterface { 
    address : string,
    amount : string,
    coin : string,
    insertTime : string,
    network : string,
    status : string,
    transferType : string,
    txId : string,
    userId : string,
    walletType : string,
}

function DepositTrade() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [deposit, setDeposit] = useState<depositInterface[]>([]);
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
              const response = await fetch(`${baseUrl}/deposit_history/${userId}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
              setDeposit(result.data);
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
      <TopHeader pageTitle='Deposit History' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
    
    <div className="tradingCon">

        
         
         {/* <div className="tradingFlex">
            <div className="tradingColumn">
                name
            </div>
            <div className="tradingColumn">
                <input type="text" placeholder='Symbol'/>
            </div>
            <div className="tradingColumn">
                <select name="">
                    <option value="symbol">BTCUSDT</option>
                    <option value="symbol">XRPUSDT</option>
                </select>
            </div>
         </div> */}


        <div className="container-fluid">
            {/* <div className="container-header">
                 <h2>All Users</h2>
            </div> */}
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr >
                        <th>No</th>
                        <th>Asset</th>
                        <th>Network</th> 
                        <th>Amount</th>
                        <th>Wallet type</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody >
                {
                 loading ? (
                    <tr>
                      <td colSpan={7} className='emptyTd'>Loading....</td>
                  </tr>
              ) : (
                deposit.length > 0 ? ( 
                    deposit.map((data, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td>
                           <td>{data.coin}</td>
                           <td>{data.network}</td>
                           <td>{data.amount}</td>
                           <td>{data.walletType}</td>
                           <td>{data.insertTime}</td>
                        </tr>
                    ))
                    
                    ): (
                        <tr>
                            <td colSpan={7} className='emptyTd'>No Deposit History</td>
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
   {/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default DepositTrade
