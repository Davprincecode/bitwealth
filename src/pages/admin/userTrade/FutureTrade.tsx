import React, { useEffect, useState } from 'react'
import SideMenu from '../../../component/SideMenu'
import TopHeader from '../../../component/TopHeader'
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


interface usersInterface { 
    userId :  string;
    email :  string;
    surName :  string;
    firstName :  string;
    country :  string;
    createdDate :  string;
    createdTime :  string;
    dob :  string;
    kycStatus: boolean;
    membership: boolean;
    paymentStatus: string;
    phoneNumber :  string;
    profileImg :  string;
    role :  string;
    refferalId: string;
    referralNum : number;
    status :  string;
    kyc : string;
    payment : string;
}

function FutureTrade() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const [users, setUsers] = useState<usersInterface[]>([]);
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
              const response = await fetch(`${baseUrl}/getalluser`, requestOptions);
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
            <div className="order orderActive">
                open orders
                <div className="orderDash orderDashActive"></div>
            </div>
            <div className="order">
                open position
                <div className="orderDash "></div>
            </div>
            <div className="order">
                trade history
                <div className="orderDash "></div>
            </div>
         </div>
         
         <div className="tradingFlex">
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
         </div>


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
                        <th>Name</th>
                        <th>Email</th> 
                        <th>Phone Number</th>
                        <th>Membership</th>
                        <th>Created date</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody >
                {users && users.map((user, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td>
                           <td>{user.surName} {user.firstName}</td>
                           <td>{user.email}</td>
                           <td>{user.phoneNumber}</td>
                           <td>{user.membership}</td>
                           <td>{user.createdDate}</td>
                           <td><div className="refferalNav">
                               <NavLink to={`/user-trade-history/${user.userId}`}>view</NavLink>
                              </div>
                            </td>
                           
                        </tr>
                    ))
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

export default FutureTrade
