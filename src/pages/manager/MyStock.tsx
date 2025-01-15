import { SetStateAction, useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom';



interface productCreated {
productId :  string;
productName :  string;
quantity :  number;
price :  number;
totalAmount :  number;
}

function MyStock() {
    const { userId } = useParams();
    const dateFormate = new Date();
    const monthFormate = dateFormate.getMonth() + 1;
    const yearFormate = dateFormate.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [navBar, setNavBar] = useState<boolean>(false);
    const [products, setProducts] = useState<productCreated[]>([]);
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
              const response = await fetch(`${baseUrl}/shopproduct`, requestOptions);
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
            <h1>My Stock</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">

    
    {/* ================================ */}
    {
        loading ? (
          <Preloader />
        ) : (
         <div className='table-con' style={{ marginTop  : "50px" }}>
            
      <table className="styled-table">
    <thead>
        <tr>
            <th>No</th>
            
            <th>Purchase name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total amount</th>
        </tr>
    </thead>
    <tbody>
    { products.map((user, id) => (

    <tr  key={id}>
        <td>{id + 1}</td>
        
        <td>{user.productName}</td>
        <td>{user.price}</td>
        <td>{user.quantity}</td>
        <td>{user.totalAmount}</td>
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

export default MyStock