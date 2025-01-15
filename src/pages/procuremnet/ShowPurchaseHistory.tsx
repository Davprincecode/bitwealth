import { useEffect, useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import { FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Preloader from '../../component/Preloader';
import numeral from 'numeral';
import { MdModeEdit } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid'; 
import { toast } from 'react-toastify';
import ModalPurchase from '../../component/ModalPurchase';


interface expenses{
    expId:  string;
    expName: string;
    price: number;
    purchaseId: string
}

interface purchaseProduct{
    price:  number;
    productId:  string;
    productName: string;
    purchase_id: string;
    quantity: number;
    totalPrice: number
}


interface product {
  productId :  string;
  productName: string;
  quantity: number;
  price: number;
    }


function ShowPurchaseHistory() {

    const { purchaseId } = useParams();


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [purchaseName, setPurchaseName] = useState<string>('');
    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productPrice, setProductPrice] = useState<number>(0);
   const [data, setData] = useState<product[]>([]);
    const [status, setStatus] = useState<string>("product");
    const [navBar, setNavBar] = useState<boolean>(false);

    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [productStatus, setProductStatus] =  useState<string>('');

    const [expenses, setExpenses] = useState<expenses[]>([]);

    const [expId, setExpId] = useState<string>('');
    const [expensesName, setExpensesName] = useState<string>('');
    const [expAmount, setExpAmount] = useState<number>(0);
    const [modalType, setModalType] = useState<string>('');

    const [products, setProducts] = useState<purchaseProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [expensesAmount, setExpensesAmount] = useState<number>(0)
    const [productAmount, setProductAmount] = useState<number>(0)
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
              const response = await fetch(`${baseUrl}` + '/purchase/' + `${purchaseId}`, requestOptions);
              const result = await response.json();
              setProductStatus(result.data.status);
              let totalPrice = 0;
              let totalExpenses = 0;
              result.data.purchaseGoods.forEach((expense: { totalPrice
                : string; }) => {
                          totalPrice += parseFloat(expense.totalPrice
                            );
                });
              result.data.expenses.forEach((expense: { price: string; }) => {
                totalExpenses += parseFloat(expense.price);
                });
                setExpensesAmount(totalExpenses);
                setProductAmount(totalPrice);
              setDate(result.data.date)
              setTime(result.data.time);
              setExpenses(result.data.expenses);
              setProducts(result.data.purchaseGoods);
              setPurchaseName(result.data.purchaseName);
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

  const switchStatus = (status : string) => {
    setStatus(status);
  } 

  const handleModal = () => {
    setIsOpen(!isOpen);
    setModalType("");
    setProductId("");
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0);
    setExpId("");
    setExpAmount(0);
    setExpensesName("");
  };

  const handleModalData = (productDataId : string, statusData : string) => {
    setModalType(statusData);
     setIsOpen(!isOpen);
    if(statusData == "product"){
      const productData = products.find(datas => datas.productId === productDataId);
      if (productData) {
        setProductId(productData.productId);
        setProductName(productData.productName);
        setProductQuantity(productData.quantity);
        setProductPrice(productData.price);
      }
    }else{ 
      const expData = expenses.find(datas => datas.expId === productDataId);
      if (expData) {
        setExpId(expData.expId);
        setExpensesName(expData.expName);
        setExpAmount(expData.price);
      }
    }
    


   }

  const handleProduct = async () => {
           setLoading(true);
           const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const raw = {
              "productName" : productName,
              "quantity" : productQuantity,
              "price" : productPrice
            };
            const requestOptions: RequestInit = {
              method: 'PUT',
              headers: myHeaders,
              body: JSON.stringify(raw),
            };
            try {
              const response = await fetch(`${baseUrl}` + '/purchasegood/' + `${productId}`, requestOptions);
              const result = await response.json();  
              toast.success("Product added successfully!");
              setLoading(false);
              location.reload(); 
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          
        }

  const handleExpenses = async () => {
           setLoading(true);
           const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const raw = {
              "expensesName" : expensesName,
              "amount" : expAmount
            };
            const requestOptions: RequestInit = {
              method: 'PUT',
              headers: myHeaders,
              body: JSON.stringify(raw),
            };
            try {
              const response = await fetch(`${baseUrl}` + '/expenses/' + `${expId}`, requestOptions);
              const result = await response.json();  
              toast.success("Product added successfully!");
              setLoading(false);
              location.reload(); 
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          
        }


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
            <h1>Purchase History</h1>
        </div>
         
         {/* ==========main container wrapper ============= */}
       <div className="mainContainerWrapper">

   {/* ======================== show purchase ========== */}
   {
        loading ? (
          <Preloader />
        ) : (
     <div className="purchaseCon">
    
     <div className="purchaseHeader">

     <div className="purchaseTitle">
      <h2>{purchaseName}</h2>
     </div>

        <div className="prDate">
            <p><span>Date : </span>{date}</p>
            <p><span>Time : </span>{time}</p>
        </div>
        <div className="purchaseHeaderFlex">
            <div className="purchaseHeaderCon">
                <p>Total Product</p>
                <h2><span>₦</span>{numeral(productAmount).format('0,0.00')}</h2>
            </div>

            <div className="purchaseHeaderCon">
                <p>Total Expenses</p>
                <h2><span>₦</span>{numeral(expensesAmount).format('0,0.00')}</h2>
            </div>
        </div>
    
      {/* <div className="purchaseHBottom"></div> */}

     </div>
     

     <div className="purchaseBody">

     <div className="statusCon">
                <div className="all"  style={{ 
        ...(status === "product" && { 
        color: "#EB232D", 
        borderBottom: "2px solid", 
        marginBottom: "-1px" 
        }) 
    }} onClick={()=>switchStatus("product")}>
                <p>Product</p>
            </div>

    <div className="deliver"  style={{ 
    ...(status === "expenses" && { 
      color: "#EB232D", 
      borderBottom: "2px solid", 
      marginBottom: "-1px" 
    }) 
  }} onClick={()=>switchStatus("expenses")}>
                <p>expenses</p>
            </div>
           </div>
     {
      status === "product" ? (
<div className="purchaseBodyDetails">
    {products.map((item, id) => (
         <div className="purchaseBodyCon" key={id}>

           <div className="purchaseName">
           <p>{item.productName}</p> 
            <p><span>Qty : </span>{item.quantity}</p>
           </div>

           <div className="purchasePrice">
            <p><span>Price : ₦</span>{item.price}</p>
           </div>

           <div className="purchaseTotalPrice">
            <p><span>Total Price : ₦</span>{item.totalPrice}
            </p>
           </div>

           {productStatus == "sent"  && (
              <div className="edit"  style={{ background: "#e26a2d", color : "white"}} onClick={() => handleModalData(item.productId, "product")}>
              <MdModeEdit />
             </div>
            )
           }

        </div>
         ))}
       </div>
      ) : (
<div className="purchaseBodyDetails">
          {expenses.map((item, id) => (
         <div className="purchaseBodyCon" key={id}>

           <div className="purchaseName">
           <p>{item.expName}</p> 
         </div>

           <div className="purchasePrice">
            <p><span>Price : ₦</span>{item.price}</p>
           </div>

           {productStatus == "sent"  && (
              <div className="edit" style={{ background: "#e26a2d", color : "white"}} onClick={() => handleModalData(item.expId, "expenses")}>
              <MdModeEdit />
             </div>
            )
           }

        </div>
         ))}
       </div>
      )
     }
     </div>

     </div>
        )}
   {/*========= show purchase end */}
    </div>
    </div>

    <ModalPurchase  isOpen={isOpen} modalType={modalType} handleModal={handleModal} handleProduct={handleProduct} handleExpenses={handleExpenses} productName={productName}  setProductName={setProductName} productQuantity={productQuantity} setProductQuantity={setProductQuantity} productPrice={productPrice} setProductPrice={setProductPrice} productId={productId} setProductId={setProductId} expId={expId} setExpId={setExpId} expensesName={expensesName} setExpensesName={setExpensesName} expAmount={expAmount} setExpAmount={setExpAmount}
    setLoading={setLoading} loading={loading} />

    </div>
  )
}

export default ShowPurchaseHistory