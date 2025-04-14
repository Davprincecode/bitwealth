import React, { useEffect, useState } from 'react'
import SideMenu from '../../../component/SideMenu'
import TopHeader from '../../../component/TopHeader'
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import OpenPosition from './OpenPosition';
import FutureTradeHistory from './FutureTradeHistory';


interface usersInterface { 
  avg_price :  string;
  client_order_id :  string;
  cum_quote :  string;
  date :  string;
  executed_qty :  string;
  order_id :  string;
  orig_qty :  string;
  orig_type :  string;
  position_side :  string;
  price :  string;
  side :  string;
  signal_id :  string;
  stop_price :  string;
  symbol :  string;
  time_in_force :  string;
  type :  string;
  working_type :  string;
}

function FutureTrade() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [openOrder, setOpenOrder] = useState<usersInterface[]>([]);
    const [switchTrade, setSwitchTrade] = useState<string>("open_order");
    const [loading, setLoading] = useState<boolean>(false);
    const { userId } = useParams();
    const {baseUrl, token} = userAuth();
    
    const handleToggle = () => {
        setNavBar(!navBar);
      };
    const switchFuture = (data : string) => {
      setSwitchTrade(data);
    }
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
              const response = await fetch(`${baseUrl}/open_trade/${userId}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
              setOpenOrder(result.data);
              setLoading(false);
            } catch (error) {
              
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  // toast.error(error.message);
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
      <TopHeader pageTitle='Future Trade' handleToggle={handleToggle}/>
  </div>

     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
    
    <div className="tradingCon">

         <div className="tradingOrder">


            <div className={switchTrade == "open_order" ? "orderActive" : "order"} onClick={() => switchFuture("open_order")}>
                open orders
                <div className={switchTrade == "open_order" ? "orderDashActive" : "orderDash"}></div>
            </div>


            <div className={switchTrade == "open_position" ? "orderActive" : "order"} onClick={() => switchFuture("open_position")}>
                open position
                <div className={switchTrade == "open_position" ? "orderDashActive" : "orderDash"}></div>
            </div>

            <div className={switchTrade == "trade_history" ? "orderActive" : "order"}  onClick={() => switchFuture("trade_history")}>
                trade history
                <div className={switchTrade == "trade_history" ? "orderDashActive" : "orderDash"}></div>
            </div>
         </div>
         
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
            

            {
              switchTrade == "open_order" ? (
                  <div className="container-body">
                      <div className="table-responsive">
                        <table>
                          <thead>
                          <tr >
                              <th>No</th>
                              <th>symbol</th>
                              <th>price</th> 
                              <th>orig quantity</th>
                              <th>orig type</th>
                              <th>position side</th>
                              <th>side</th>
                              <th>stop price</th>
                              <th>type</th>
                              <th>working type</th>
                              <th>date</th>
                          </tr>
                          </thead>
                          <tbody>


                      {
                        loading ? (
                              <tr>
                                <td colSpan={7} className='emptyTd'>Loading....</td>
                            </tr>
                        ) : (
                      openOrder.length > 0 ? (
                        openOrder.map((data, id) => (
                              <tr  key={id}>
                                <td>{id + 1}</td>
                                <td>{data.symbol}</td>
                                <td>{data.price}</td>
                                <td>{data.orig_qty}</td>
                                <td>{data.orig_type}</td>
                                <td>{data.position_side}</td>
                                <td>{data.side}</td>
                                <td>{data.stop_price}</td>
                                <td>{data.type}</td>
                                <td>{data.working_type}</td>
                                <td>{data.date}</td>
                              </tr>
                          ))

                          ) : (
                            <tr>
                                <td colSpan={7} className='emptyTd'>No Future History</td>
                            </tr>
                        )
                        )
                      }                        
                          </tbody>
                          </table> 
                      </div>
                  </div>
              ) : switchTrade == "open_position" ? (
               <OpenPosition userId={userId}/>
              ) : switchTrade == "trade_history" ? (
                <FutureTradeHistory userId={userId}/>
              ) : null
            }
            

           
        </div>
    </div>


    </div>
   {/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default FutureTrade
