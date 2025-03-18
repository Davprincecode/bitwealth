import React, { useEffect, useState } from 'react'
import { FiAlignRight } from "react-icons/fi";
import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import numeral from 'numeral';
import TopHeader from '../../component/TopHeader';
import { IoIosNotifications } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import CryptoLandingPage from '../CryptoLandingPage';

    

function TradeDashboard() {
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
        // fetchData();
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
      <CryptoLandingPage />
     </div>
         </div>
         </div>
      </div>
    )
}

export default TradeDashboard
