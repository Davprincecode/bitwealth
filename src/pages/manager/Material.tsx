import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import {MdDelete } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import Preloader from '../../component/Preloader';


interface product {
  productId :  string;
  productName: string;
  quantity: number;
  price: number;
  sellingPrice : number;
    }

function Material() {
    const [navBar, setNavBar] = useState<boolean>(false);
    const [data, setData] = useState<product[]>([]);
  
    
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
              const response = await fetch(`${baseUrl}/materialreceive`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json(); 
              setData(result.data);
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

    const handleIssuedProduct = async () => {
       if(data.length > 0){
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
          "goodsPurchase" : data
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
      
        try {
          const response = await fetch(`${baseUrl}/materialreceive`, requestOptions);
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          setData([]);
        setLoading(false);
          toast.success("Product Receive successfully!");
        } catch (error) {
          setLoading(false);
          if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);        
          } else {
            toast.error('An unknown error occurred.');
          }
        }
        }
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
            <h1>Receive Product</h1>
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
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
    { data.map((user, id) => (

    <tr  key={id}>
        <td>{id + 1}</td>
        <td>{user.productName}</td>
        <td>{user.quantity}</td>
        <td>{user.sellingPrice}</td>

        

    </tr>

    )) } 
  
    </tbody>
</table>
    </div>
        )}
        
    <div className="btn">
        {
          data.length > 0 ? (
            <button onClick={handleIssuedProduct} disabled={loading}>
              {loading ? 'Receiving...' : 'Receive Product'}
            </button>
          ) : (
            <button disabled={true}>
              {/* {loading ? 'Receiving...' : 'Receive Product'} */}
            </button>
          )
        }
    </div>

{/* </form> */}

    </div>
    </div>

    </div>
  )
}

export default Material