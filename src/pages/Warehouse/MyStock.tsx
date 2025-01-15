import React, { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { FaPlus } from "react-icons/fa";
import { MdAirplanemodeActive, MdAirplanemodeInactive, MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import { userAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import numeral from 'numeral';
import Preloader from '../../component/Preloader';

interface productCreated {
        productId :  string;
        productName :  string;
        purchasePrice :  number;
        purchaseTotalAmount :  number;
        quantity :  number;
        userId :  string;
    }


function Mystock() {
    const { userId } = useParams();
   
    const [navBar, setNavBar] = useState<boolean>(false);
    const [products, setProducts] = useState<productCreated[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>();
    const [totalQty, setTotalQty] = useState<number>();
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
              const response = await fetch(`${baseUrl}/warehouse`, requestOptions);
              const result = await response.json();
              let totalPrice = 0;
              let totalQty = 0;
              result.data.map((item: { purchaseTotalAmount : string; quantity: string; }) => {
                totalPrice += parseFloat(item.purchaseTotalAmount);
                totalQty += parseFloat(item.quantity);
                });
              setTotalAmount(totalPrice);
              setTotalQty(totalQty);
              setProducts(result.data); 
              setLoading(false);
            } catch (error) {
            //   console.log(error);
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
    
    <div className="mainContainer">
    
        <div className="mainContainerHeader">
        <p className='barMenu' onClick={handleToggle}>
                <FiAlignRight />
            </p>
            <h1>My stock</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
    <div className="mainContainerWrapper">
    
    <div className="MystockkTopCon">
    <div className="upperContainerWrapper">
    <div className="upperCon">
            <div className="upperConFlex">
                <div className="upperICon">
                <i className="fa-solid fa-tag"></i>
                </div>
                <div className="uppercontent">
                    <h2>number of</h2>
                    <p>product</p>
                </div>
            </div>
            <div className="containerNumber">
                <h4>{products.length}</h4>
            </div>
        </div>


        <div className="upperCon">
            <div className="upperConFlex">
                <div className="upperICon">
                <i className="fa-solid fa-tag"></i>
                </div>
                <div className="uppercontent">
                    <h2>total stocks</h2>
                    <p>quantity</p>
                </div>
            </div>
            <div className="containerNumber">
                <h4>{totalQty}</h4>
            </div>
        </div>

        <div className="upperCon">
            <div className="upperConFlex">
                <div className="upperICon">
                <i className="fa-solid fa-tag"></i>
                </div>
                <div className="uppercontent">
                    <h2>total</h2>
                    <p>amount</p>
                </div>
            </div>
            <div className="containerNumber">
                <h4>{numeral(totalAmount).format('0,0.00')}</h4>
            </div>
        </div>
       
        

    </div>
    </div>

    {
        loading ? (
          <Preloader />
        ) : (
    <div className='Mystock'  style={{overflow: "auto" }}>
        <table className="styled-table">

    <thead>
        
        <tr>
            <th>no</th>
            <th>product name</th>
            <th>purchase price</th>
            <th>quantity</th>
            <th>total</th>
        </tr>
    </thead>
    <tbody>

        {
           products.map((item,index)=>(

             <tr>
            <td>{index + 1}</td>
            <td>{item.productName}</td>
            <td>{item.purchasePrice}</td>
            <td>{item.quantity}</td>        
            <td>{numeral(item.purchaseTotalAmount).format('0,0.00')}</td>        
        </tr>   
            ))
        }
        
            
    </tbody>
</table>
    </div>
    )}

    </div>
    </div>
    </div>
  )
}

export default Mystock