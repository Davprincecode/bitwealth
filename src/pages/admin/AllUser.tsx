import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';
import { ImBackward2, ImForward3 } from 'react-icons/im';
import { userAuth } from '../context/AuthContext';
import { MdAirplanemodeActive, MdAirplanemodeInactive, MdAutoDelete } from 'react-icons/md';


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
    membership :  string;
    paymentStatus: boolean;
    phoneNumber :  string;
    profileImg :  string;
    role :  string;
    status :  string;
}

function AllUser() {
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
              const response = await fetch(`${baseUrl}/getalluser`, requestOptions);
              
              const result = await response.json(); 
              setUsers(result.data);
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
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
      <TopHeader pageTitle='All User' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
        <div className="container-fluid">
            <div className="container-header">
                 <h2>All User</h2>
            </div>
            <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr role="row">
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th> 
                        <th>Phone Number</th>
                        <th>Country</th>
                        <th>Dob</th>
                        <th>Membership</th>
                        <th>Created date</th>
                        <th>Kyc Status</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody >
                {
                    users.map((user, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td>
                           <td>{user.surName} {user.firstName}</td>
                           <td>{user.email}</td>
                           <td>{user.phoneNumber}</td>
                           <td>{user.country}</td>
                           <td>{user.dob.split('T')[0]}</td>
                           <td>{user.membership}</td>
                           <td>{user.createdDate}</td>
                           <td>{user.kycStatus}</td>
                           <td>{user.paymentStatus}</td>
                           <td>
                            { 
                            user.status == "active" ? (
                                <div className="actionwrap">
                                <div className="actionActive">
                                    <div className="actionActiveIcon">
                                     <MdAirplanemodeActive />   
                                    </div>
                                    {user.status} 
                                </div>
                                </div>
                            ) : (
                                <div className="actionwrap">
                                    <div className="actionDeactive">
                                      <div className="actionDeactiveIcon">
                                        <MdAirplanemodeInactive />
                                      </div>
                        
                                        {user.status}
                                    </div>
                                </div>
                            )
                            }
                           
                           </td>
                           <td>
                                <div className="delete">
                                <MdAutoDelete />   
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
                            <p>showing</p>
                            <div className="entriesNumber">
                                <p>1 <span>to</span> 1</p>
                            </div>
                            <div className="entriesNumber">
                                <p>of <span>1</span> entries</p>
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

export default AllUser
