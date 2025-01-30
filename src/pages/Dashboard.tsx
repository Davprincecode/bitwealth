import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { GoUnverified } from 'react-icons/go';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdVerified, MdVerifiedUser } from 'react-icons/md';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="column-container">
        <div className="column">
          <div className="icon-container">
              <FaUsers />
          </div>
          <div className="column-title">Total Users</div>
          <div className="column-number">1,234</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <MdVerified />
          </div>
          <div className="column-title">Paid Users</div>
          <div className="column-number">567</div>
        </div>

        <div className="column">
          <div className="icon-container">
                <MdVerifiedUser />
          </div>
          <div className="column-title">Verified KYC</div>
          <div className="column-number">234</div>
        </div>

        <div className="column">
          <div className="icon-container">
            <GoUnverified />
          </div>
          <div className="column-title">Pending KYC</div>
          <div className="column-number">123</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <GoUnverified />
          </div>
          <div className="column-title">Rejected KYC</div>
          <div className="column-number">45</div>
        </div>

        <div className="column">
          <div className="icon-container">
             <IoStatsChartSharp />
          </div>
          <div className="column-title">Signals Sent</div>
          <div className="column-number">678</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;