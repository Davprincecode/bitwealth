import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import {MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid'; 
import { FaEye } from 'react-icons/fa';
import Preloader from '../../component/Preloader';
import { IoIosSearch } from "react-icons/io";
import numeral from 'numeral';
import { useParams } from 'react-router-dom';




interface productCreated {
transactionId :  string;
purchaseDate :  string;
amount :  number;
    }

function MgTransfer() {
    const { userId } = useParams();
  const dateFormate = new Date();
  const monthFormate = dateFormate.getMonth() + 1;
  const yearFormate = dateFormate.getFullYear();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [navBar, setNavBar] = useState<boolean>(false);
    const [products, setProducts] = useState<productCreated[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [dateFrom, setFromDate] = useState<Date | null>(new Date())
    const [formattedFromDate, setFormattedFromDate] = useState('');
    const [dateTo, setToDate] = useState<Date | null>(new Date())
    const [formattedToDate, setFormattedToDate] = useState('');
    const [dateMonth, setMonthDate] = useState<Date | null>(dateFormate)
    const [month, setMonth] = useState(monthFormate)
    const [year, setYear] = useState(yearFormate)
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
    setLoading(true);
    const raw = {
        "startDate" : formattedFromDate,
        "endDate" : formattedToDate,
        "userId" : userId
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
      const response = await fetch(`${baseUrl}/mgpurchasetransferfilter`, requestOptions);
      const result = await response.json();
      setProducts(result.data); 
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    setLoading(true);
    const raw = {
        "month" : month,
        "year" : year,
        "userId" : userId
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
      const response = await fetch(`${baseUrl}/mgpurchasetransferfilterbymonth`, requestOptions);
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
              const response = await fetch(`${baseUrl}/mgpurchasetransfer/${userId}`, requestOptions);
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
          
        };
    
        fetchData();
      }, []);

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
            <h1>Transfer</h1>
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
       <p>{currentMonth} <span>{year}</span> <span>Transactions</span></p>
          <input type="date" value={dateMonth?.toISOString().slice(0, 10)} onChange={ handleMonthlyFilter } />

        <table className="styled-table">
    <thead>
        <tr>
            <th>No</th>
            <th>purchase date</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
    { products.map((user, id) => (

    <tr  key={id}>
        <td>{id + 1}</td>
        <td>{user.purchaseDate}</td>
        <td>{numeral(user.amount).format('0,0.00')}</td>
        
    </tr>

    )) } 
  
    </tbody>
</table>
    </div>   
        )
    }
      
    {/* =========================================== */}

    </div>
    </div>
    </div>
  )
}

export default MgTransfer