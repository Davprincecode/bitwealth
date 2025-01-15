import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { FaPlus } from "react-icons/fa";
import {MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import Modal from '../Warehouse/Modal';
import Preloader from '../../component/Preloader';
import ModalWarehouse from '../../component/ModalWarehouse';
// import { v4 as uuidv4 } from 'uuid'; 

interface product {
  productId :  string;
  productName: string;
  quantity: number;
  price: number;
  sellingPrice : number;
    }

interface productCreated {
productId: string
productName: string
purchasePrice: number
purchaseTotalAmount : number
quantity: number
userId: string;
}

interface Datas {
  id: string;
  name :  string
}
function MinorSales() {
    const [navBar, setNavBar] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<Datas[]>([]);
    const [data, setData] = useState<product[]>([]);
    const [products, setProducts] = useState<productCreated[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<productCreated[]>([]);
    
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);

  
    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productPrice, setProductPrice] = useState<number>(0);
    const [sellingPrice, setSellingPrice] = useState<number>(0);

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
              const response = await fetch(`${baseUrl}/warehouse`, requestOptions);
              const result = await response.json(); 
              
              
              setProducts(result.data);
            } catch (error) {
              console.log(error);
            }
          
        };
    
        fetchData();
        fetchDistributor();
      }, []);

  const fetchDistributor = async () => {
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
              const response = await fetch(`${baseUrl}/distributor`, requestOptions); 
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
              setSupplier(result.data);
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
        

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.options[event.target.selectedIndex].text;
    const selectedValue = event.target.value;
    setProductName(selectedText);
    setProductId(selectedValue);
    if (selectedProduct.length == 0){
    const result = products.filter((product) => product.productId === selectedValue)
    setSelectedProduct(result);    
    }else if(selectedProduct[0]?.productId !== selectedValue){
        const result = products.filter((product) => product.productId === selectedValue)
        setSelectedProduct(result);
    }
  };

const handleProduct = () => {
      setLoading(true);
        if(productQuantity > selectedProduct[0].quantity){
            setLoading(false);
            toast.error("The Quantity requested is greater than the available quantity!");
        }else{
            const existingProduct = data.find((product) => product.productId === productId);
            if (existingProduct) {
              existingProduct.quantity += productQuantity;
              setData((prevData) =>
                prevData.map((product) =>
                  product.productId === productId ? existingProduct : product
                )
              );
                setLoading(false); 
                setProductId('');
                setProductName('');
                setProductQuantity(0);
                setProductPrice(0);
                setSellingPrice(0);
                setIsOpen(!isOpen);
            } else {
              const newProduct = {
                productId,
                productName,
                quantity: productQuantity,
                price: productPrice,
                sellingPrice : sellingPrice
              };

              setData((prevData) => [...prevData, newProduct]);
                setLoading(false); 
                setProductId('');
                setProductName('');
                setProductQuantity(0);
                setProductPrice(0);
                setSellingPrice(0);
                setIsOpen(!isOpen);
            }

              const quantity = selectedProduct[0].quantity - productQuantity;
                  const newSelectedProduct = {
                    productId: selectedProduct[0].productId, 
                    productName:  selectedProduct[0].productName,
                    purchasePrice: selectedProduct[0].purchasePrice,
                    purchaseTotalAmount : selectedProduct[0].purchaseTotalAmount,
                    quantity: quantity,
                    userId: selectedProduct[0].userId
                    };
                 setSelectedProduct([newSelectedProduct]);
                toast.success("Product added successfully!");
             }
            
    }

    const handleDelete = async (productId: string) => {
        setLoading(true);
        toast.success("Deleted Successfully");
      
        // Find the product being deleted to add its quantity back to available products
        const deletedProduct = data.find((product) => product.productId === productId);
      
        // Remove product from data
        setData(data.filter((product) => product.productId !== productId));
      
        // Add quantity back to available products
        setSelectedProduct((prevProducts) => {
          const updatedProducts = prevProducts.map((product) =>
            product.productId === productId
              ? { ...product, quantity: product.quantity + (deletedProduct?.quantity ?? 0) }
              : product
          );
          return updatedProducts;
        });
      
        setLoading(false);
      };
    
    const handleIssuedProduct = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
          "goodsIssue" : data
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
        try {
          const response = await fetch(`${baseUrl}/minorsales`, requestOptions);
    
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          
          setSelectedProduct([]);
          setData([]);
          setSelectedProduct([]);
          setLoading(false);
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
            <h1>Minor Sales</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">
       {
        loading ? (
          <Preloader />
        ) : (
  <form action="" method="post">
   
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
            <th>Selling Price</th>
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
                  data.length > 0 ? (
                    <button onClick={handleIssuedProduct} disabled={loading}>
                      {loading ? 'Selling...' : 'Sell'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Selling...' : 'Sell'}
                    </button>
                  )
              }
    </div>
</form>
        )}

    </div>
    </div>

    <ModalWarehouse isOpen={isOpen} handleModal={handleModal} handleProduct={handleProduct} productName={productName} setProductName={setProductName} productQuantity={productQuantity} setProductQuantity={setProductQuantity} productPrice={productPrice} setProductPrice={setProductPrice} sellingPrice ={sellingPrice} setSellingPrice={setSellingPrice} products={products} selectedProduct={selectedProduct} handleSelectChange={handleSelectChange} productId={productId} setProductId={setProductId} setLoading={setLoading} loading={loading}/>

    </div>
  )
}
export default MinorSales