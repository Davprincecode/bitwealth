import { useEffect, useState } from 'react'
import { FiAlignRight } from "react-icons/fi";

import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import numeral from 'numeral';



function PRDashboard() {
  const {baseUrl, token} = userAuth()
  const [navBar, setNavBar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  
  const [expenses, setExpenses] = useState(0);
  const [receivedqty, setReceivedqty] = useState(0);
  const [totalpurchase, setTotalpurchase] = useState(0);

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
          const response = await fetch(`${baseUrl}/procurementdashboard`, requestOptions);
          const result = await response.json();
          setExpenses(result.data.expenses)
          setReceivedqty(result.data.receivedqty)
          setTotalpurchase(result.data.totalpurchase)
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
  
      <div className="mainContainerHeader">
      <p className='barMenu' onClick={handleToggle}>
              <FiAlignRight />
          </p>
          <h1>Dashboard</h1>
      </div>
       {/* ==========main container wrapper ============= */}
     <div className="mainContainerWrapper">
  
         <div className="firstHeader">
          <div className="firstHeaderTitle">
              <h2>datas</h2>
          </div>
         <div className="upperContainerWrapper">
  
         <div className="upperCon">
  
          <div className="upperConFlex">
              <div className="upperICon">
                  <i className="fa-solid fa-tag"></i>
              </div>
              <div className="uppercontent">
                  <h2>product purchase</h2>
                  <p>Number</p>
              </div>
          </div>
  
          <div className="containerNumber">
           <h4>{totalpurchase}</h4>
          </div>
         </div>
  
         <div className="upperCon">
          <div className="upperConFlex">
              <div className="upperICon">
                  <i className="fa-solid fa-cart-shopping"></i>
              </div>
              <div className="uppercontent">
                  <h2>Expenses</h2>
                  <p>Number</p>
              </div>
          </div>
          <div className="containerNumber">
           <h4>{numeral(expenses).format('0,0.00')}</h4>
          </div>
         </div>
  
         <div className="upperCon">
          <div className="upperConFlex">
              <div className="upperICon">
                  <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div className="uppercontent">
                  <h2>Purchase Deliver</h2>
                  <p>Number</p>
              </div>
          </div>
          <div className="containerNumber">
           <h4>{receivedqty}</h4>
          </div>
         </div>
         </div>
      </div>
  
      
         
         </div>
         </div>
         </div>
      </div>
    )
}

export default PRDashboard
