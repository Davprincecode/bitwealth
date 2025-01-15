import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import {MdModeEdit } from 'react-icons/md';
import { userAuth } from '../context/AuthContext';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Preloader from '../../component/Preloader';
import { IoIosSearch } from 'react-icons/io';
import { NavLink } from 'react-router-dom';


interface productCreated {
purchaseId :  string;
purchaseName :  string;
date : string;
time : string;
status : string;
    }

function PurchaseStatus() {
    const dateFormate = new Date();
    const monthFormate = dateFormate.getMonth() + 1;
    const yearFormate = dateFormate.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [products, setProducts] = useState<productCreated[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<productCreated[]>([]);
    const [status, setStatus] = useState<string>('all');

    const [navBar, setNavBar] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();

    const [dateFrom, setFromDate] = useState<Date | null>(dateFormate)
    const [formattedFromDate, setFormattedFromDate] = useState('');
    const [dateTo, setToDate] = useState<Date | null>(dateFormate)
    const [dateMonth, setMonthDate] = useState<Date | null>(dateFormate)
    const [month, setMonth] = useState(monthFormate)
    const [year, setYear] = useState(yearFormate)
    const [formattedToDate, setFormattedToDate] = useState('');
    const currentMonth = months[month - 1];

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
      if (e !== null) {
          const selectedDate = e.target.valueAsDate;
        
          if (selectedDate !== null) {
            setFromDate(selectedDate);
            // Format date in DD-MM-YYYY format
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
            setFormattedFromDate(`${day}-${month}-${year}`);
          } else {
            // Handle null case, e.g., clear formatted date
            setFormattedFromDate('');
          }
        }
    };
  
    const handleToChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
      if (e !== null) {
          const selectedDate = e.target.valueAsDate;
          if (selectedDate !== null) {
            setToDate(selectedDate);
            // Format date in DD-MM-YYYY format
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
            setFormattedToDate(`${day}-${month}-${year}`);
          } else {
            // Handle null case, e.g., clear formatted date
            setFormattedToDate('');
          }
        }
    };
  
  const handleFilter = async() => { 
    if(formattedFromDate == "" || formattedToDate == ""){
     toast.error("fill or change both from and to date!");
    }else{ 
      setStatus("all");   
      setLoading(true);
      const raw = {
          "startDate" : formattedFromDate,
          "endDate" : formattedToDate
        };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
      };
      try {
        const response = await fetch(`${baseUrl}/getonlypurchasebyfilter`, requestOptions);
  
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setProducts(result.data); 
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
  }
  
  const handleMonthlyFilter = async(e: React.ChangeEvent<HTMLInputElement> | null) => { 
    if (e !== null) {
      const selectedDate = e.target.valueAsDate;
      if (selectedDate !== null) {
        setMonthDate(selectedDate);
        const monthSelected = (selectedDate.getMonth() + 1);
        const yearSelected = selectedDate.getFullYear();
        setMonth(monthSelected);
        setYear(yearSelected);
        fetchForMonth(monthSelected, yearSelected);
      } 
    }
  }
  
   const fetchForMonth = async(month : number, year :  number) => {     
    setStatus("all");
    setProducts([]);
    setFilteredProducts([]);
    setLoading(true);
      const raw = {
          "month" : month,
          "year" : year
        };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
      };
      try {
        const response = await fetch(`${baseUrl}/getonlypurchasebymonth`, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setProducts(result.data); 
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
              const response = await fetch(`${baseUrl}/getonlypurchase`, requestOptions);
              const result = await response.json(); 
              setProducts(result.data); 
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          
        };
    
        fetchData();
      }, []);

  const switchStatus = (status : string) => {
    setStatus(status);
    if(status === "all"){
        setFilteredProducts([]);
        // if (holdAllProducts.length > 0) {
        //     setProducts(holdAllProducts); 
        // }  
    }
    if(status === "pending"){
        const filteredPrd = products.filter((product) => product.status === 'sent');
        setFilteredProducts(filteredPrd);
    }
    if(status === "delivered"){
        const filteredPrd = products.filter((product) => product.status === 'received');
        setFilteredProducts(filteredPrd);
    }
  } 
    
  const handleToggle = () => {
    setNavBar(!navBar);
  };
  return (
    <div className="mainWrapper">

    <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
    </div>
    
    <SideMenu navBar={navBar} handleToggle={handleToggle} />

    {/* =============================== */}
    <div className="mainContainer">
    
        <div className="mainContainerHeader">
        <p className='barMenu' onClick={handleToggle}>
                <FiAlignRight />
            </p>
            <h1>Purchase Status</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">
       <div className="dateRangeFlex">

<div className="dateRange">
  <p>from : </p>
  <input type="date" value={dateFrom?.toISOString().slice(0, 10)} onChange={ handleFromChange} />
</div>

<div className="dateRange">
  <p>to : </p>
  <input type="date" value={dateTo?.toISOString().slice(0, 10)} onChange={ handleToChange} />
</div>

<div className="searchDate" onClick={handleFilter}>
   <IoIosSearch />
</div>

</div>

{/* ================================ */}
{
        loading ? (
          <Preloader />
        ) : (
         <div className='table-con' style={{ marginTop  : "50px" }}>
            
            <p>{currentMonth} <span>{year}</span> <span>Purchase Status</span></p>
          <input type="date" value={dateMonth?.toISOString().slice(0, 10)} onChange={ handleMonthlyFilter } />
           
           <div className="statusCon">
                <div className="all"  style={{ 
        ...(status === "all" && { 
        color: "#EB232D", 
        borderBottom: "2px solid", 
        marginBottom: "-1px" 
        }) 
    }} onClick={()=>switchStatus("all")}>
                <p>all
                
                </p>
            </div>
            <div className="pending"  style={{ 
    ...(status === "pending" && { 
      color: "#EB232D", 
      borderBottom: "2px solid", 
      marginBottom: "-1px" 
    }) 
  }} onClick={()=>switchStatus("pending")}>
                <p>pending</p>
            </div>
            <div className="deliver"  style={{ 
    ...(status === "delivered" && { 
      color: "#EB232D", 
      borderBottom: "2px solid", 
      marginBottom: "-1px" 
    }) 
  }} onClick={()=>switchStatus("delivered")}>
                <p>delivered</p>
            </div>
           </div>

           { filteredProducts.length > 0 ? (
<table className="styled-table">
    <thead>
        <tr>
            <th>No</th>
            <th>Purchase title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    { filteredProducts.map((user, id) => (

    <tr  key={id}>
        <td>{id + 1}</td>
        <td>{user.purchaseName}</td>
        <td>{user.date}</td>
        <td>{user.time}</td>
        <td>{user.status == "sent" ? "Pending" : "Delivered"}</td>
        <td>
            <div className="actionIcons">
            <div className="delete">
            <NavLink to={`/showPurchaseHistory/${user.purchaseId}`}>
              <FaEye />
            </NavLink>
            </div>
            {user.status == "sent"  && (
              <div className="edit" >
              <MdModeEdit />
             </div>
            )
            }
            </div>
        </td>
    </tr>

    )) } 
  
    </tbody>
       </table>
            ) : (
                
            status !== "pending" && status !== "delivered" && (
                    <table className="styled-table">
<thead>
<tr>
    <th>No</th>
    <th>Purchase title</th>
    <th>Date</th>
    <th>Time</th>
    <th>Status</th>
    <th>Action</th>
</tr>
</thead>
<tbody>
{ products.map((user, id) => (

<tr  key={id}>
<td>{id + 1}</td>
<td>{user.purchaseName}</td>
<td>{user.date}</td>
<td>{user.time}</td>
<td>{user.status == "sent" ? "Pending" : "Delivered"}</td>
<td>
    <div className="actionIcons">
    <div className="delete">
    <NavLink to={`/showPurchaseHistory/${user.purchaseId}`}><FaEye /></NavLink>
    </div>
    </div>
</td>
</tr>

)) } 

</tbody>
</table>
            )
                
            )
           }
        
    </div> 
        )}
    {/* =========================================== */}

    </div>
    </div>
    </div>
  )
}

export default PurchaseStatus