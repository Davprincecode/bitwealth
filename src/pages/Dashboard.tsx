import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { GoUnverified } from 'react-icons/go';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdVerified, MdVerifiedUser } from 'react-icons/md';
import { userAuth } from './context/AuthContext';

function Dashboard() {
  const {baseUrl, token} = userAuth();
  const [loading, setLoading] = useState<boolean>(false);


    const [allUser, setAllUser] = useState(0);
    const [approveKyc, setApproveKyc] = useState(0);
    const [paidUser, setPaidUser] = useState(0);
    const [pendingKyc, setPendingKyc] = useState(0);
    const [rejectKyc, setRejectKyc] = useState(0);
    const [verifyKyc, setVerifyKyc] = useState(0);
    const [signalSent, setSignalSent] = useState(0);
  
  useEffect(() => {
    fetchData();
    }, []);

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
          const response = await fetch(`${baseUrl}/admindashboard`, requestOptions);
          const result = await response.json();
          setAllUser(result.data.allUser);
          setApproveKyc(result.data.approveKyc);
          setPaidUser(result.data.paidUser);
          setPendingKyc(result.data.pendingKyc);
          setRejectKyc(result.data.rejectKyc);
          setVerifyKyc(result.data.verifyKyc);
          setSignalSent(result.data.signalSent);
          
          setLoading(false);
        } catch (error) {
        //   console.log(error);
        }
    };  

  return (
    <div className="dashboard-container">
      <div className="column-container">
        <div className="column">
          <div className="icon-container">
              <FaUsers />
          </div>
          <div className="column-title">Total Users</div>
          <div className="column-number">{allUser}</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <MdVerified />
          </div>
          <div className="column-title">Paid Users</div>
          <div className="column-number">{paidUser}</div>
        </div>

        <div className="column">
          <div className="icon-container">
                <MdVerifiedUser />
          </div>
          <div className="column-title">Verified KYC</div>
          <div className="column-number">{verifyKyc}</div>
        </div>

        <div className="column">
          <div className="icon-container">
            <GoUnverified />
          </div>
          <div className="column-title">Pending KYC</div>
          <div className="column-number">{pendingKyc}</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <GoUnverified />
          </div>
          <div className="column-title">Rejected KYC</div>
          <div className="column-number">{rejectKyc}</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <IoStatsChartSharp />
          </div>
          <div className="column-title">Signals Sent</div>
          <div className="column-number">{signalSent}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;