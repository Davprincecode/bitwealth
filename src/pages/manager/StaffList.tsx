import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import {MdDelete } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import { NavLink, useParams } from 'react-router-dom';
import Preloader from '../../component/Preloader';


interface staffInterface {
  userId  :  string;
  email  :  string;
  fullName  :  string;
  phoneNumber  : number;
    }

function StaffList() {
    const { path } = useParams();
    const [navBar, setNavBar] = useState<boolean>(false);
    const [data, setData] = useState<staffInterface[]>([]);
  
    
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);


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
              const response = await fetch(`${baseUrl}/getshopposusers`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json(); 
              setData(result.data);
              setLoading(false)
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  };


  const handleToggle = () => {
    setNavBar(!navBar);
  };
  return (
    <div className="mainWrapper">

    <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
    </div>
    
    <SideMenu navBar={navBar} handleToggle={handleToggle} />
    
    <div className="mainContainer">
    
        <div className="mainContainerHeader">
        <p className='barMenu' onClick={handleToggle}>
                <FiAlignRight />
            </p>
            <h1> Staff List </h1>
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
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            { data.map((user, id) => (

            <tr  key={id}>
                <td>{id + 1}</td>
                <td>{user.fullName}</td>

                <td>
                    <div className="userAction">
                    <NavLink to={`/${path}/${user.userId}`} >
                    view
                    </NavLink>
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

export default StaffList