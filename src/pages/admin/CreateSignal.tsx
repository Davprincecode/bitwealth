import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png';

import {toast } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { ImCheckmark } from 'react-icons/im';
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';


function CreateSignal() {
  const navigate = useNavigate();
  const [navBar, setNavBar] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);

  const [asset, setAsset] = useState<string>(''); 
  const [tradeType, setTradeType] = useState<string>('');
  const [timeFrame, setTimeFrame] = useState<string>('');
  const [riskLevel, setRiskLevel] = useState<string>('');
  const [leverage, setLeverage] = useState<string>('');
  const [recommendedPositionSize, setRecommendedPositionSize] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<string>('');
  const [entryPrice, setEntryPrice]= useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [trailingStopLoss, setTrailingStopLoss] = useState<string>('');
  const [takeProfit1, setTakeProfit1] = useState<string>('');
  const [takeProfit2, setTakeProfit2] = useState<string>('');
  const [takeProfit3, setTakeProfit3] = useState<string>('');
  const [marketCondition, setMarketCondition] = useState<string>('');
  const [signalMessage, setSignalMessage] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [projectedDateOfClosure, setProjectedDateOfClosure] = useState<string>('');
  const {baseUrl, token} = userAuth();  

  const handleToggle = () => {
    setNavBar(!navBar);
  };

  const handleLogin = async () => {
    setLoading(true);
    const raw = {
      'asset' : asset,
      'tradeType' : tradeType,
      'timeFrame' : timeFrame,
      'riskLevel' : riskLevel,
      'leverage' : leverage,
      'recommendedPositionSize' : recommendedPositionSize,
      'duration' : duration,
      'currentPrice' : currentPrice,
      'entryPrice' : entryPrice,
      'stopLoss' : stopLoss,
      'trailingStopLoss' : trailingStopLoss,
      'takeProfit1' : takeProfit1,
      'takeProfit2' : takeProfit2,
      'takeProfit3' : takeProfit3,
      'marketCondition' : marketCondition,
      'signalMessage' : signalMessage,
      'date' : date,
      'time' : time,
      'projectedDateOfClosure' : projectedDateOfClosure

    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/createsignal`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      toast.success(responseJson.message);
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


  return (
    <div>

  <div className="mainWrapper">
  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='create signal' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
            <div className="formWrapper">
            <div className="formCon">
                    <form>
                
                            <div className="input">
                                <label >date</label>
                                <input type="date" placeholder='asset'
                                value={date} onChange={(e) => setDate(e.target.value)}
                            />
                            </div>
                            <div className="input">
                                <label >time</label>
                                <input type="time" placeholder='asset'
                                value={time} onChange={(e) => setTime(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >asset</label>
                                <input type="text" placeholder='asset'
                                value={asset} onChange={(e) => setAsset(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >trade type</label>
                                <input type="text" placeholder='trade type'
                                value={tradeType} onChange={(e) => setTradeType(e.target.value)}
                            />
                            </div>
                        
                            <div className="input">
                                <label >timeframe</label>
                                <input type="text" placeholder='time frame'
                                value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >risk level</label>
                                <input type="text" placeholder='risk level'
                                value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >Leverage</label>
                                <input type="text" placeholder='leverage'
                                value={leverage} onChange={(e) => setLeverage(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >Recommended Position Size </label>
                                <input type="text" placeholder='Recommended Position Size'
                                value={recommendedPositionSize} onChange={(e) => setRecommendedPositionSize(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >Duration</label>
                                <input type="text" placeholder='duration'
                                value={duration} onChange={(e) => setDuration(e.target.value)}
                            />
                            </div>


                            <div className="input">
                                <label >current price</label>
                                <input type="text" placeholder='currect price'
                                value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)}
                            />
                            </div>


                            <div className="input">
                                <label >entry price</label>
                                <input type="text" placeholder='entry price'
                                value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >stop loss</label>
                                <input type="text" placeholder='stop loss'
                                value={stopLoss} onChange={(e) => setStopLoss(e.target.value)}
                            />
                            </div>
                            <div className="input">
                                <label >Trailing Stop Loss</label>
                                <input type="text" placeholder='stop loss'
                                value={trailingStopLoss} onChange={(e) => setTrailingStopLoss(e.target.value)}
                            />
                            </div>


                            <div className="input">
                                <label >take profit 1</label>
                                <input type="text" placeholder='take profit 1'
                                value={takeProfit1} onChange={(e) => setTakeProfit1(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >take profit 2</label>
                                <input type="text" placeholder='take profit 2'
                                value={takeProfit2} onChange={(e) => setTakeProfit2(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >take profit 3</label>
                                <input type="text" placeholder='take profit 3'
                                value={takeProfit3} onChange={(e) => setTakeProfit3(e.target.value)}
                            />
                            </div>

                            <div className="input">
                                <label >market condition</label>
                                <input type="text" placeholder='market condition'
                                value={marketCondition} onChange={(e) => setMarketCondition(e.target.value)}
                            />
                            </div>
                        

                            <div className="input">
                                <label >signal message</label>
                                <input type="text" placeholder='signal message'
                                value={signalMessage} onChange={(e) => setSignalMessage(e.target.value)}
                            />
                            </div>


                            <div className="input">
                                <label >Projected date of closure</label>
                                <input type="date" placeholder='duration'
                                value={projectedDateOfClosure} onChange={(e) => setProjectedDateOfClosure(e.target.value)}
                            />
                            </div>

                            <div className="input">
                            <div className="btn">
                            {
                                date && time && asset && tradeType && timeFrame
                                && riskLevel && leverage && recommendedPositionSize
                                  && duration && currentPrice && entryPrice 
                                  && stopLoss && trailingStopLoss && takeProfit1 
                                  && takeProfit2 && takeProfit3 
                                  && marketCondition 
                                  && signalMessage && projectedDateOfClosure ? (
                                <button onClick={handleLogin} disabled={loading}>
                                {loading ? 'Loading......' : 'Send signal'}
                                </button>
                            ) : (
                                <button disabled={true}>
                                {loading ? 'Loading......' : 'Send signal'}
                                </button>
                            )
                        }
                            </div>
                            </div>
                        </form>
            </div>
            </div>

        </div>
       </div>
       </div>
    </div>
  )
}

export default CreateSignal
