import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ImBackward2, ImForward3 } from 'react-icons/im';

interface productsInterface { 
  status :  string;

  asset :  string;
currentPrice :  string;
date :  string;
duration :  string;
entryPrice :  string;
leverage :  string;
marketCodition :  string;
projectedDateOfClosure :  string;
recommendedPositionSize :  string;
riskLevel :  string;
signalMessage :  string;
stopLoss :  string;
takeProfit1 :  string;
takeProfit2 :  string;
takeProfit3 :  string;
time :  string;
timeFrame :  string;
tradeId :  string;
tradeType :  string;
trailingStopLoss :  string;
}

function UserTradeSignal() {
  const [navBar, setNavBar] = useState<boolean>(false); 
  const [products, setProducts] = useState<productsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
            const response = await fetch(`${baseUrl}/getsignal`, requestOptions);
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
            const result = await response.json();
            setProducts(result.data);
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
      <TopHeader pageTitle='Trading Signal' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
        <div className="container-fluid">
            <div className="container-header">
                 <h2>Trading Signal</h2>
            </div>
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr>
                       <th>No</th>
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
                    {
                      products.map((product, id)=> (
                        <tr key={id}>
                         <td>{id + 1}</td>
                        <td>{product.asset}</td>
                        <td>{product.tradeType}</td>
                        <td>{product.timeFrame}</td>
                        <td>{product.riskLevel}</td>
                        <td>{product.leverage}</td>
                        <td>{product.recommendedPositionSize}</td>
                        <td>{product.duration}</td>
                        <td>{product.currentPrice}</td>
                        <td>{product.entryPrice}</td>
                        <td>{product.stopLoss}</td>
                        <td>{product.trailingStopLoss}</td>
                        <td>{product.takeProfit1}</td>
                        <td>{product.takeProfit2}</td>
                        <td>{product.takeProfit2}</td>
                        <td>{product.takeProfit3}</td>
                        <td>{product.signalMessage}</td>
                        <td>{product.date}</td>
                        <td>{product.time}</td>
                        <td>{product.projectedDateOfClosure}</td>
                    </tr> 
                      ))
                    }    
                   </tbody>
                    </table> 
                </div>  
            </div>

            <div className="tableBottomNav">
                          <div className="entriesFlex">
                            <p>Showing</p>
                            <div className="entriesNumber">
                                <p>1 <span>to</span> 1</p>
                            </div>
                            <div className="entriesNumber">
                                <p>of <span>1</span> Entries</p>
                            </div>
                          </div>

                        <div className="tablefbArrowflex">
                            <div className="backwardarrow">
                              <ImBackward2 />
                            </div>
                            <div className="tablePagginationValue">
                                1
                            </div>
                            <div className="forwardarrow">
                               <ImForward3 />
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

export default UserTradeSignal
