import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { FaPlus } from "react-icons/fa";
import { MdAirplanemodeActive, MdAirplanemodeInactive, MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
interface Datas {
  productId: string;
  productName :  string
}
function AddToStock() {
    const [navBar, setNavBar] = useState<boolean>(false);
     const [data, setData] = useState<Datas[]>([]);
    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [price, setPrice] = useState<number>();

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
            const response = await fetch(`${baseUrl}/product`, requestOptions);
            const result = await response.json(); 
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
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

    const handleLogin = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
        'productId' : productId,
        "productName": productName,
        'quantity' : quantity,
        'price' : price
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
        try {
          const response = await fetch(`${baseUrl}/addtostock`, requestOptions);
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          setLoading(false);
          toast.success("Product added successfully!");
            setProductId('');
            setProductName('');
            setQuantity(0);
            setPrice(0);
        } catch (error) {
          setLoading(false);
          if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);        
          } else {
            toast.error('An unknown error occurred.');
          }
        }
      };

  const handleToggle = () => {
    setNavBar(!navBar);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.options[event.target.selectedIndex].text;
    const selectedValue = event.target.value;
    setProductName(selectedText);
    setProductId(selectedValue);
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
            <h1>Add Product</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">
       <form>

    <div>
        <label >Product Names</label>
        <select value={productId}  onChange={handleSelectChange}>
          <option value="">Select Product Name</option>
          {
            data.map((item, index)=>(
           <option value={item.productId} key={index}>{item.productName}</option>
            ))
          }
        </select>
    </div>

    <div>
        <label >Product Quantity</label>
        <input type="number" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
    </div>

    <div>
        <label >Selling Price</label>
        <input type="number" placeholder='Selling Price' value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/>
    </div>

    
    
    <div className="btn">
        {
                  productName && quantity && price ? (
                    <button onClick={handleLogin} disabled={loading}>
                      {loading ? 'Creating...' : 'create'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Creating...' : 'create'}
                    </button>
                  )
              }
    </div>

      </form>
    </div>
    </div>
    </div>
  )
}

export default AddToStock