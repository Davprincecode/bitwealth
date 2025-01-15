import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import numeral from 'numeral';
import { FaPlus } from "react-icons/fa";
import {MdDelete, MdModeEdit } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import Modal from '../Warehouse/Modal';
import Preloader from '../../component/Preloader';
import PartPaymentModal from './PartPaymentModal';
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
function IssueProduct() {
    const [navBar, setNavBar] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<Datas[]>([]);
    const [data, setData] = useState<product[]>([]);
    const [products, setProducts] = useState<productCreated[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<productCreated[]>([]);
    
    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenPartPayment, setIsOpenPartPayment] = useState<boolean>(false);

    const [destinationName, setDestinationName] = useState<string>('');
    const [destinationType, setDestinationType] = useState<string>('');

    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productPrice, setProductPrice] = useState<number>(0);
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalQty, setTotalQty] = useState<number>(0);
    
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

  const  handlePartPaymentModal = () => {
    setIsOpenPartPayment(!isOpenPartPayment);
    setBalance(0);
    setAmountPaid(0);
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

  const handleDestination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.options[event.target.selectedIndex].text;
    const selectedValue = event.target.value;
    setDestinationName(selectedText);
    setDestinationType(selectedValue);
  };

    const handleProduct = () => {
      setLoading(true);
        if(productQuantity > selectedProduct[0].quantity){
            setLoading(false);
            toast.error("The Quantity requested is greater than the available quantity!");
        }else{
            const existingProduct = data.find((product) => product.productId === productId);
           
            if (existingProduct) {
              let totalCal = totalAmount + (sellingPrice * productQuantity);
              let qtyCal = totalQty + productQuantity;
              setTotalAmount(totalCal);
              setTotalQty(qtyCal);
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
             
              let totalCal = totalAmount + (sellingPrice * productQuantity);
              let qtyCal = totalQty + productQuantity;
              setTotalAmount(totalCal);
              setTotalQty(qtyCal);
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

    const handleDelete = async (productId : string) => {
        setLoading(true);
        const dt = data.find((user) => user.productId == productId);
        if(dt){
         let totalCal = totalAmount - (dt.sellingPrice * dt.quantity);
        let qtyCal = totalQty - dt.quantity;
        setTotalAmount(totalCal);
        setTotalQty(qtyCal); 
        }
        setData(data.filter((user) => user.productId !== productId));
        toast.success("Deleted Successfully"); 
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

    const handleIssuedProduct = async (type : string, bal : number) => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
          "destinationName" : destinationName,
          "destinationType" : destinationType,
          "totalAmount" : totalAmount,
          "creditAmount" : bal, 
          "paidAmount" : amountPaid,
          "status" : type,
          "goodsIssue" : data
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
      
        try {
          const response = await fetch(`${baseUrl}/issueProduct`, requestOptions);  
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          // setPurchaseName('');
          setSelectedProduct([]);
          setBalance(0);
          setAmountPaid(0);
          setTotalAmount(0);
          setTotalQty(0);
          setIsOpenPartPayment(false);
          setData([]);
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

  const handlePartPayment = () => {
    let balan = totalAmount - amountPaid;
     setBalance(balan);
     handleIssuedProduct("part payment", balan);
  }

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
            <h1>Issued Product</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">
       {
        loading ? (
          <Preloader />
        ) : (
  <form action="" method="post">
    <div>
        <label> Destination </label>

        <select  onChange={handleDestination} >
           <option value="Enter Destination"></option>
           {
            supplier.map((item, id)=>(
               <option value={item.name} key={id}>{item.name}</option>
            ))
           }
           
        </select>
        
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
      
      <div className="total-con">
        <p>total amount: <span>{numeral(totalAmount).format('0,0.00')}</span></p>
        <p>quantity : <span>{totalQty}</span></p>
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
        <td>{user.sellingPrice}</td>
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
  <div className="btnFlex">

    <div className="btn">
        {
                  destinationName && data.length > 0 ? (
                    <button onClick={() => handleIssuedProduct("credit", balance)} disabled={loading}>
                      {loading ? 'Issuing...' : 'Not Paid'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Issuing...' : 'Not Paid'}
                    </button>
                  )
          }
    </div>

    <div className="btn">
        {
                  destinationName && data.length > 0 ? (
                    <div className='partPayment' onClick={ handlePartPaymentModal }>
                      {loading ? 'Issuing...' : 'Part Payment'}
                    </div>
                  ) : (
                    <div className='partPaymentInactive'>
                      {loading ? 'Issuing...' : 'Part Payment'}
                    </div>
                  )
          }
    </div>
    <div className="btn">
        {
                  destinationName && data.length > 0 ? (
                    <button onClick={() => handleIssuedProduct("paid", balance)} disabled={loading}>
                      {loading ? 'Issuing...' : 'Paid'}
                    </button>
                  ) : (
                    <button disabled={true}>
                      {loading ? 'Issuing...' : 'Paid'}
                    </button>
                  )
          }
    </div>
</div>

</form>
        )}

    </div>
    </div>

    <Modal isOpen={isOpen} handleModal={handleModal} handleProduct={handleProduct} productName={productName} setProductName={setProductName} productQuantity={productQuantity} setProductQuantity={setProductQuantity} productPrice={productPrice} setProductPrice={setProductPrice} sellingPrice ={sellingPrice} setSellingPrice={setSellingPrice} products={products} selectedProduct={selectedProduct} handleSelectChange={handleSelectChange} productId={productId} setProductId={setProductId} setLoading={setLoading} loading={loading} />
    
    <PartPaymentModal isOpenPartPayment={isOpenPartPayment} handlePartPaymentModal={handlePartPaymentModal} handlePartPayment={handlePartPayment} amountPaid={amountPaid} setAmountPaid={setAmountPaid} setLoading={setLoading} loading={loading} />

    </div>
  )
}
export default IssueProduct