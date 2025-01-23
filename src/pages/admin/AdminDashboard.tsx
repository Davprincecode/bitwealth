import React, { useEffect, useState } from 'react'
import { FiAlignRight } from "react-icons/fi";
import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import numeral from 'numeral';
import TopHeader from '../../component/TopHeader';
import { IoIosNotifications } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

    

function AdminDashboard() {
    const {baseUrl, token} = userAuth()
    const [navBar, setNavBar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const [amount, setAmount] = useState(0);
    const [product, setProduct] = useState(0);
    const [sales, setSales] = useState(0);


    const handleToggle = () => {
      setNavBar(!navBar);
    };

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
              const response = await fetch(`${baseUrl}/shopdashboard`, requestOptions);
              const result = await response.json();
            
              setProduct(result.data.product);
              setAmount(result.data.amount);
              setSales(result.data.sales);
              setLoading(false);
            } catch (error) {
            //   console.log(error);
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
        <TopHeader pageTitle='dashboard' handleToggle={handleToggle}/>
    </div>

      
       
       {/* ==========main container wrapper ============= */}
     <div className="mainContainerWrapper">
            <div className="mainCon">

            <div className="mainBalance">
             <div className="totalBalance">
                <div className="total">
                  <p>total amount</p>
                  <div className="eyeicon">
                    <IoEyeSharp />
                    {/* <FaEyeSlash /> */}
                  </div>
                </div>
              
              <h2><span>₦</span>788,78788.00</h2>
             </div>

             <div className="interest">
                <div className="today">
                  <p>Today</p>
                  <h6>+ 6.0%</h6>
                </div>
                <div className="week">
                  <p>7 Days</p>
                  <h6>+ 2.2%</h6>
                </div>
                <div className="month">
                  <p>30 Days</p>
                  <h6>+ 4.5%</h6>
                </div>
             </div>
             
             </div>
            
          <div className="transactionsection">
            <div className="firstsection">
              <h4>crypto asset</h4>
            </div>
            <div className="secondsection">
              <h4>recent transaction</h4>
            </div>
          </div>

            

            
            </div>
     </div>

         </div>
         </div>
      </div>
    )
}

export default AdminDashboard
