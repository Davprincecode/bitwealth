import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function PaymentStatus() {
  const [navBar, setNavBar] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token, membership} = userAuth();
  
  const handleToggle = () => {
      setNavBar(!navBar);
    };


      const fetchData = async () => {

        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);

        const raw = {
        'membership' :  membership,
        'amount' : membership === "hedge fund" ? 20 : 50
        };

        const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        };
          try {
            const response = await fetch(`${baseUrl}/createpayment`, requestOptions);       
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
             toast.success("Payment success apply wait for approval");
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
  
    const [btcCopied, setBtcCopied] = useState(false);
    const [usdtCopied, setUsdtCopied] = useState(false);
  const btc = '1MLvQ95DBwmbzkWCNm2RBcVSmoxFDCo42L'; 
  const usdt = 'TK3Hj3sa6TeprpbGcxNUifvnjUUMsJEmns'; 

  const handleBtc = () => {
    navigator.clipboard.writeText(btc);
    setBtcCopied(true);
    setTimeout(() => setBtcCopied(false), 2000); 
  };

  const handleUsdt = () => {
    navigator.clipboard.writeText(usdt);
    setUsdtCopied(true);
    setTimeout(() => setUsdtCopied(false), 2000); 
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
    You need to make our {
      membership === "hedge fund" ? "hedge fund membership payment of $20" :
      "trade club membership payment of $50"
    }  
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

    <div onClick={handleBtc} className='copy'>
      {btcCopied ? 'Copied!' : 'Copy'}
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

    <div onClick={handleUsdt} className='copy'>
      {usdtCopied? 'Copied!' : 'Copy'}
    </div>   
   </div>
     
      {
        loading ? (
        <div className="paymentMade">
          loading.......
        </div>
        ) : (
          <div className="paymentMade" onClick={fetchData}>
          payment made
      </div>
        )
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

export default PaymentStatus
