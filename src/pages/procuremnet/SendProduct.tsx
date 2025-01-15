import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { FaPlus } from "react-icons/fa";
import {MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import Modal from '../../component/Modal';
import { v4 as uuidv4 } from 'uuid'; 

interface product {
  productId :  string;
  productName: string;
  quantity: number;
  price: number;
    }

interface productCreated {
productId :  string;
productName :  string;
    }

function SendProduct() {
    const [navBar, setNavBar] = useState<boolean>(false);
    const [data, setData] = useState<product[]>([]);
    const [products, setProducts] = useState<productCreated[]>([]);
    
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<boolean>(false);

    const [purchaseName, setPurchaseName] = useState<string>('');

    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productPrice, setProductPrice] = useState<number>(0);
    const [newProduct, setNewProduct] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
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
              setProducts(result.data);
            } catch (error) {
              console.log(error);
            }
          
        };
    
        fetchData();
      }, []);

  const handleModal = () => {
    setIsOpen(!isOpen);
    setUpdateData(false);
    setProductId("");
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0);
  };

  const handleUpdateModal = (productId: string) => {
    setIsOpen(true);
    setUpdateData(true);
    const productData = data.find(datas => datas.productId === productId);
    if (productData) {
      setProductId(productData.productId);
      setProductName(productData.productName);
      setProductQuantity(productData.quantity);
      setProductPrice(productData.price);
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.options[event.target.selectedIndex].text;
    const selectedValue = event.target.value;
    setProductName(selectedText);
    setProductId(selectedValue);
  };

  const handleProduct = () => {
        setLoading(true);
        const productUId = "pr" + uuidv4();
        const newProduct = {
            productId : productId ?  productId : productUId, 
            productName: productName,
            quantity: productQuantity,
            price: productPrice,
          };
        if(productId == "")  {
         handleNewProduct(productUId, productName);
         setProducts((prevData) => [...prevData, newProduct])
         setData((prevData) => [...prevData, newProduct]);
          }else{
            const existingProduct = data.find(
              (product) => product.productId === newProduct.productId
            );
          if (existingProduct) {
                setData((prevData) =>
                prevData.map((product) =>
                  product.productId === newProduct.productId
                    ? {
                        ...product,
                        quantity: product.quantity + newProduct.quantity,
                        price: newProduct.price,
                      }
                    : product
                )
              );
            }else{
             setData((prevData) => [...prevData, newProduct]); 
            }
      }
      setProductId('');
      setProductName('');
      setProductQuantity(0);
      setProductPrice(0);
      toast.success("Product added successfully!");
      setLoading(false);
      setNewProduct(!newProduct);
      handleModal(); 
    }

  const handleEditProduct = (productDataId : String) => {
      setLoading(true);
      const newProduct = {
          productId : productId , 
          productName: productName,
          quantity: productQuantity,
          price: productPrice,
        };
        setData((prevData) =>
          prevData.map((product) =>
            product.productId === productDataId ? newProduct : product
          )
        );
          setProductId('');
          setProductName('');
          setProductQuantity(0);
          setProductPrice(0);
          toast.success("Product added successfully!");
          setLoading(false);
          setNewProduct(!newProduct);
          handleModal();
    
  }

    const handleDelete = async (productId : string) => {
        setLoading(true);
        toast.success("Deleted Successfully");  
        setData(data.filter((user) => user.productId !== productId));
          setLoading(false);       
      };

      const handleNewProduct = async (newProductId : string, newProductName : string) => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
          "productId" : newProductId,
          "productName" : newProductName
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
      
        try {
          const response = await fetch(`${baseUrl}/product`, requestOptions);
    
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
         setLoading(false);
         setProductId('');
         setProductName('');
         setProductQuantity(0);
         setProductPrice(0);
         toast.success("Product added successfully!");
        } catch (error) {
          setLoading(false);
          if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);        
          } else {
            toast.error('An unknown error occurred.');
          }
        }
      };

    const handlePurchase = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
          "purchaseName" : purchaseName,
          "goodsPurchase" : data
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
        try {
          const response = await fetch(`${baseUrl}/purchase`, requestOptions);
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          setLoading(false);
          setPurchaseName('');
          setData([]);
          // setProducts(result.data);
          toast.success("Product purchase successfully!");
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
            <h1>Purchase</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">

       <form action="" method="post">
        

    <div>
        <label >Purchase Title</label>
        <input type="text" placeholder='Enter Purchase Name' value={purchaseName} onChange={(e) => setPurchaseName(e.target.value)}/>
    </div>

     {/* ================================ */}
     <div className='table-con'>
     <div className="addCon">
        <div className="add" onClick={handleModal}>
            <div className="addp">
                <span>add product</span>
                    <LuPlus />
            </div>
        </div>
    </div>

<table className="styled-table">
    <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    { data.map((user, id) => (

    <tr  key={id}>
        <td>{id + 1}</td>
        <td>{user.productName}</td>
        <td>{user.quantity}</td>
        <td>{user.price}</td>
        
        <td>
         
           <div className="actionIcons">

            <div className="delete">
               {
                loading ? (
             <div className='inActiveDel'><MdDelete /></div>
                ): (
            <div onClick={ (e) => {handleDelete(user.productId)}} ><MdDelete /></div>
                )
               }
            </div>

             <div className="edit" onClick={ () => handleUpdateModal(user.productId)}>
              <MdModeEdit />
             </div>
            </div>

        </td>
    </tr>

    )) } 
  
    </tbody>
</table>
    </div>
    {/* =========================================== */}
    <div className="btn">
        {
                  purchaseName && data ? (
                    <button onClick={handlePurchase} disabled={loading}>
                      {loading ? 'Purchasing...' : 'Purchase'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Purchase...' : 'Purchase'}
                    </button>
                  )
              }
    </div>

</form>
    </div>
    </div>

    <Modal isOpen={isOpen} updateData={updateData} handleModal={handleModal}  handleProduct={handleProduct} handleEditProduct={handleEditProduct} productName={productName} setProductName={setProductName} productQuantity={productQuantity} setProductQuantity={setProductQuantity} productPrice={productPrice} setProductPrice={setProductPrice} products={products} handleSelectChange={handleSelectChange} productId={productId} setProductId={setProductId} setLoading={setLoading} loading={loading} newProduct={newProduct} setNewProduct={setNewProduct} />

    </div>
  )
}

export default SendProduct