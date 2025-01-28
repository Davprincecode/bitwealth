import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoIosWarning, IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { ImBackward2, ImForward3 } from 'react-icons/im';
import profile  from '../../assets/images/profile.jpg'
import { MdOutlineVerifiedUser, MdVerified, MdVerifiedUser } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';




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

function PaymentStatus() {
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
  
    //   fetchData();
    }, []);

    const [copied, setCopied] = useState(false);
  const textToCopy = 'Hello, World!'; // replace with your text

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
  };
  return (
    <div>
      
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Subscription' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

<div className="profileWrapper">
<div className="profileContainer paymenStatus">

    <div className="paymentContent">
    <p>
     Thank you for your interest in BitweathCapital. 
    </p>
    
    <p>
    To enjoy our trade signals and educational resources.
    </p>

    <p>
    You need to make our trade club membership payment of $50 
    </p>

     <p className='payAddress'>
     Please copy the wallet address below and send the equivalent amount. After making the payment,
      click the button below.
     </p>
     <p>
     Our team will review your payment and notify you of its approval.
     </p>
    </div>
     
   <div className="walletflex">
     <div className="walletaddress">
        <div className='btcName'>
            BTC Address
        </div>
        <div className="btcaddresss">
        1MLvQ95DBwmbzkWCNm2RBcVSmoxFDCo42L
        </div>
     </div>

    <div onClick={handleCopy} className='copy'>
      {copied ? 'Copied!' : 'Copy'}
    </div>   
   </div>

   <div className="walletflex">
     <div className="walletaddress">
        <div className='btcName'>
         USDT(Trc20) Address
        </div>
        <div className="btcaddresss">
        TK3Hj3sa6TeprpbGcxNUifvnjUUMsJEmns
        </div>
     </div>

    <div onClick={handleCopy} className='copy'>
      {copied ? 'Copied!' : 'Copy'}
    </div>   
   </div>
     

        <div className="paymentMade">
            payment made
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

export default PaymentStatus
