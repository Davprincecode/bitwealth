import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


function KycVerification() {

  const [navBar, setNavBar] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token, membership, setKycStatus} = userAuth();
  const [idCard, setIdCard] = useState<File | null>(null);
  const [address, setAddress] = useState<string>('');
  const [binanceApiKey, setBinanceApiKey] = useState<string>('');
  const [binanceSecretKey, setBinanceSecretKey] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [proofAddress, setProofAddress] = useState<File | null>(null);

  const handleToggle = () => {
      setNavBar(!navBar);
    };


  const fetchData = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('address', address);
        formData.append('apiKey', binanceApiKey);
        formData.append('secretKey', binanceSecretKey);
        formData.append('userType', membership);
        formData.append('platform', 'binance');
        formData.append('userName', userName);
        formData.append('password', password);  
        if (idCard) {
            formData.append('idCard', idCard);
        }
        if (proofAddress) {
            formData.append('proofOfAddress', proofAddress);
        }
  
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: {
            Authorization: token,
          },
          body: formData,
        };
          try {
            const response = await fetch(`${baseUrl}/createkyc`, requestOptions); 
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
            const result = await response.json();
            toast.success("kyc uploaded success");
            setIdCard(null);
            setAddress('');
            setBinanceApiKey('');
            setBinanceSecretKey('');
            setUserName('');
            setPassword('');
            setProofAddress(null);
            setKycStatus("pending");
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
      <TopHeader pageTitle='kyc verification' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

       

            <div className="formWrapper userProfile">
             <div className="formCon">
            <form>
                <div className="input">
                    <label >Means Of Identification</label>

                    <input type="file" placeholder='Means Of Identification'
                      onChange={(e) => {
                          if (e.target.files) {
                            setIdCard(e.target.files![0]);
                          } else {
                            setIdCard(null);
                          }
                        }} 
                   />
                </div>

                <div className="input">
                    <label >Full address</label>
                    <input type="text" placeholder='Full address'
                     value={address} onChange={(e) => setAddress(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >Proof Of Address</label>
                    <input type="file" placeholder='Proof of address'
                     onChange={(e) => {
                      if (e.target.files) {
                        setProofAddress(e.target.files![0]);
                      } else {
                        setProofAddress(null);
                      }
                    }}
                   />
                </div>

{ membership === "hedge fund" ? (
    <>
<div className="input">
                    <label >Binance Login</label>
                    <input type="text" placeholder='Email'
                    value={userName} onChange={(e) => setUserName(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >Password</label>
                    <input type="text" placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
                </>
  ) : (
      <>

                <div className="input">
                    <label >Binance Api Key</label>
                    <input type="text" placeholder='Api Key'
                    value={binanceApiKey} onChange={(e) => setBinanceApiKey(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >Binance Secret Key</label>
                    <input type="text" placeholder='Secret Key'
                    value={binanceSecretKey} onChange={(e) => setBinanceSecretKey(e.target.value)}
                   />
                </div>

      </>
  )
}

                <div className="input">
                <div className="btn">
                {
                  idCard && address && proofAddress && binanceApiKey && binanceSecretKey || idCard && address && proofAddress && userName && password  ? (
                    <button  disabled={loading} onClick={fetchData}>
                      {loading ? 'Loading......' : 'Send'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading......' : 'Send'}
                    </button>
                  )
              }
                </div>
                </div>
            </form>
            </div>
            </div>

       
    </div>
{/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default KycVerification
