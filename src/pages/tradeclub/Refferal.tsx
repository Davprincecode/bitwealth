import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../context/AuthContext';
import { MdAirplanemodeActive, MdAirplanemodeInactive, MdAutoDelete, MdRestore } from 'react-icons/md';
import { toast } from 'react-toastify';


interface usersInterface { 
    email :  string;
    surName :  string;
    firstName :  string;
    country :  string;
}

function Refferal() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [users, setUsers] = useState<usersInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const {baseUrl, token, refferalId} = userAuth();
  
    
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
              const response = await fetch(`${baseUrl}/getrefferals`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json(); 
              setUsers(result.data);
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

        const [referralLink, setReferralLink] = useState(false);
        const [referralCodeCopied, setReferralCodeCopied] = useState(false);
        const btc = '1MLvQ95DBwmbzkWCNm2RBcVSmoxFDCo42L'; 
        const refCode = refferalId; 

      const handleBtc = () => {
        navigator.clipboard.writeText(btc);
        setReferralLink(true);
        setTimeout(() => setReferralLink(false), 2000); 
      };
    
      const handleRefCode = () => {
        navigator.clipboard.writeText(refCode);
        setReferralCodeCopied(true);
        setTimeout(() => setReferralCodeCopied(false), 2000); 
      }; 

  return (
    <div>
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Refferals' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
   {/* <div className="walletflex">
     <div className="walletaddress">
        <div className='btcName'>
            Referral Link
        </div>
        <div className="btcaddresss">
        https://bitwealthcapital.org/#/register/{refferalId}
        </div>
     </div>

    <div onClick={handleBtc} className='copy'>
      {referralLink ? 'Copied!' : 'Copy'}
    </div>   
   </div> */}

   <div className="walletflex">
     <div className="walletaddress">
        <div className='btcName'>
         Referral Code
        </div>
        <div className="btcaddresss">
        {refferalId}
        </div>
     </div>

    <div onClick={handleRefCode} className='copy'>
      {referralCodeCopied? 'Copied!' : 'Copy'}
    </div>   
   </div>
        <div className="container-fluid">
            <div className="container-header">
                 <h2>Refferals</h2>
            </div>
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr >
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th> 
                        <th>Country</th> 
                    </tr>
                    </thead>

                    <tbody >
                {users && users.map((user, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                          <td>{user.surName +" "+ user.firstName}</td>
                          <td>{user.email}</td>
                          <td>{user.country}</td>
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

export default Refferal
