import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'

import { ImBackward2, ImCancelCircle, ImForward3 } from 'react-icons/im';
import { userAuth } from '../context/AuthContext';

import { toast } from 'react-toastify';
import { MdAirplanemodeActive, MdAirplanemodeInactive } from 'react-icons/md';
import { FcApproval } from 'react-icons/fc';


interface usersInterface { 
    address :  string;
    apiKey :  string;
    secretKey :  string;
    fullName :  string;
    idCard :  string;
    proofOfAddress :  string;
    status :  string;
    userId :  string;
}

function PendingKyc() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [users, setUsers] = useState<usersInterface[]>([]);
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
              const response = await fetch(`${baseUrl}/getpendingkyc`, requestOptions);  
              
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


      const approve = async(userId: string) => {
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
          const response = await fetch(`${baseUrl}/approvekyc/${userId}`, requestOptions);  
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
      
      }

      const reject = async(userId: string) => {
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
          const response = await fetch(`${baseUrl}/rejectkyc/${userId}`, requestOptions);  
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
      
      }

  return (
    <div>
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Pending Kyc' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
        <div className="container-fluid">
            <div className="container-header">
                 <h2>Pending Kyc</h2>
            </div>
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr >
                        <th>No</th>
                        <th>Name</th>
                        <th>address</th>
                        <th>api key</th>
                        <th>secret key</th>
                        <th>id card</th>
                        <th>proofOfAddress</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody >
                {
                    users.map((user, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td> 
                            <td>{user.fullName}</td> 
                            <td>{user.address}</td> 
                            <td>{user.apiKey}</td> 
                            <td>{user.secretKey}</td> 
                            <td>
                                <div className="kycImg">
                                    <img src={user.idCard} alt="" />
                                </div>     
                            </td> 
                            <td>
                                <div className="kycImg">
                                    <img src={user.proofOfAddress} alt="" />
                                </div>
                                
                            </td> 
                            <td>{user.status}</td>
                           <td>
                          <div className="actionwrapdiv">
                            <div className="approvediv" onClick={(e)=>{approve(user.userId)}}>
                             <FcApproval />
                             <p>
                                {
                                    loading ? "loading...." : "approve"
                                }
                                </p>
                            </div>

                            <div className="rejectdiv"  onClick={(e)=>{reject(user.userId)}}>
                             <ImCancelCircle />
                             <p>
                             {
                                loading ? "loading...." : "reject"
                                }
                             </p>
                            </div>
                          </div>
                             
                           
                           </td>
                           
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

export default PendingKyc
