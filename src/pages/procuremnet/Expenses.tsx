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
import { NavLink } from 'react-router-dom';


interface productCreated {
purchaseId :  string;
purchaseName :  string;
date : string;
time : string;
    }

function Expenses() {
    const [navBar, setNavBar] = useState<boolean>(false);
    const [products, setProducts] = useState<productCreated[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();

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
            <h1>Purchase</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">
       {
        loading ? (
          <Preloader />
        ) : (
     <div className='table-con'>
        <table className="styled-table">
    <thead>
        <tr>
            <th>No</th>
            <th>Purchase title</th>
            <th>Date</th>
            <th>Time</th>
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
        <td>
            <div className="actionIcons">
            <div className="delete">
            <NavLink to={`/showexpenses/${user.purchaseId}`}><FaEye /></NavLink>
            </div>
            </div>
        </td>
    </tr>

    )) } 
  
    </tbody>
        </table>
    </div>
        )}

    </div>
    </div>
    </div>
  )
}

export default Expenses