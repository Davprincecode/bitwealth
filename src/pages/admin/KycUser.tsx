import React, { useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { TbBackslash } from 'react-icons/tb';

function KycUser() {
    const [navBar, setNavBar] = useState<boolean>(false); 
    const handleToggle = () => {
        setNavBar(!navBar);
      };

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
                    <tr role="row">
                        <th >Name</th>
                        <th >Email</th>
                        <th >Kyc Status</th>
                        <th >View document</th>
                        <th >Action</th>
                    </tr>
                    </thead>

                    <tbody >
                                                                
                                <tr className="odd" role="row">
                                    <td>Hamis Ahmed</td>
                                    <td>hamisahmed10@gmail.com</td>
                                    <td>
                                        <span className="badge badge-lg badge-pill badge-warning">
                                        Pending
                                    </span>
                                    </td>
                                    <td>
                                        <a href="https://bitwealthcapital.com/admin/kyc/1" target="_blank"><span className="badge badge-pill badge-info">View Document</span></a>
                                    </td>
                                    <td>
                                          <div className="d-flex">

                                                <div className="approveBtn">
                                                    <p>
                                                        Approve
                                                    </p>
                                                    <div className="aprroveIcon">
                                                      <IoMdCheckmarkCircle />
                                                    </div> 
                                                </div>

                                                <div className="rejectBtn">
                                                    
                                                    <p>
                                                        Reject
                                                    </p>
                                                    <div className="rejectIcon">
                                                    <TbBackslash />
                                                    </div> 
                                                </div>
                                                
                                        
                                                
                                           
                                        </div>												
                                    </td>
                                </tr>
                                </tbody>
                    </table> 
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

export default KycUser
