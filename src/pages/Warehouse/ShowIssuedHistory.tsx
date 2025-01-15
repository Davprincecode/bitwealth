import { useEffect, useState } from 'react'
import {toast } from 'react-toastify';
import { FiAlignRight } from 'react-icons/fi';
import SideMenu from '../../component/SideMenu';
import { userAuth } from '../context/AuthContext';
import { FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Preloader from '../../component/Preloader';
import numeral from 'numeral';
import ModalPayment from './ModalPayment';


interface expenses{
    expId:  string;
    expName: string;
    price: number;
    purchaseId: string
}

interface purchaseProduct {
        date : string;
        productName: string;
        quantity :  number;
        sellingPrice : number; 
        totalAmount: number
}

function ShowIssuedHistory() {

    const { purchaseId } = useParams();

    const [status, setStatus] = useState<string>("product");
    const [navBar, setNavBar] = useState<boolean>(false);

    const [customerName, setCustomerName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    const [expenses, setExpenses] = useState<expenses[]>([]);
    const [products, setProducts] = useState<purchaseProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [creditAmount, setCreditAmount] = useState<number>(0);
    const [productAmount, setProductAmount] = useState<number>(0);
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const {baseUrl, token} = userAuth();

    const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [issuedId, setIssuedId] = useState<number>(0);
    const [print, setPrint] = useState<boolean>(false);
    const [docTitle, setDocTitle] = useState<string>('');

    const  handlePaymentModal = () => {
        setIsOpenPayment(!isOpenPayment);
      };

      const handlePayment = () => {
        setIsOpenPayment(!isOpenPayment);
      }

    useEffect(() => {
        fetchData();
      }, []);

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
          const response = await fetch(`${baseUrl}` + '/issuedgoods/' + `${purchaseId}`, requestOptions);
          const result = await response.json();
            setIssuedId(result.data.issuedId);
            setCreditAmount(result.data.creditAmount);
            setProductAmount(result.data.totalAmount);
            setPaidAmount(result.data.paidAmount);
            setCustomerName(result.data.customerName);
            setDate(result.data.issuedDate);
            setStatus(result.data.status);
            setProducts(result.data.goods);
            setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      
    };
      const makePayment  = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const raw = {
            "issuedId": issuedId,
            "amount": amountPaid
         };
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
      };
        try {
          const response = await fetch(`${baseUrl}` + '/makepayment', requestOptions);
          const result = await response.json();
           toast.success(result.message);
          setAmountPaid(0);
          setLoading(false);
          fetchData();
          setIsOpenPayment(!isOpenPayment);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    }


  const handleToggle = () => {
    setNavBar(!navBar);
  };

const printDoc = () => {
    const uniqId = Math.random().toString(36).substring(2, 11);
    const title = `${customerName}_${uniqId}`;
    setDocTitle(title);
    setPrint(!print);
}


  useEffect(() => {
    if (print) {
      window.document.title = docTitle
      window.print();
      setDocTitle('johntop foods');
      setPrint(!print);
    }
  }, [print]);

  return (
    <div className="mainWrapper">

    <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
    </div>
    {!print && (
  <SideMenu navBar={navBar} handleToggle={handleToggle} />
   )}

    {/* =============================== */}

    <div className="mainContainer" style={{marginLeft : print ? "0px": "220px"}} >
    
        <div className="mainContainerHeader">
        <p className='barMenu' onClick={handleToggle}>
                <FiAlignRight />
            </p>
            <h1>Purchase {print ? ( <span>Invoice </span>) : ( <span>History</span>)} </h1>
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
     
        <div className="prDate">
            <p><span>Date : </span>{date}</p>
            <p><span>Name : </span>{customerName}</p>
        </div>
        <div className="purchaseHeaderFlex">
            <div className="purchaseHeaderCon">
                <p>Total Amount</p>
                <h2><span>₦</span>{numeral(productAmount).format('0,0.00')}</h2>
            </div>
          {
            status === "paid" ? (
                <div className="purchaseHeaderCon">
                    <p>Paid Amount</p>
                    <h2><span>₦</span>{numeral(paidAmount).format('0,0.00')}</h2>
                </div>
            ): (
                <>
            <div className="purchaseHeaderCon">
                <p>Paid Amount</p>
                <h2><span>₦</span>{numeral(paidAmount).format('0,0.00')}</h2>
            </div>

            <div className="purchaseHeaderCon">
                    <p>Credit Amount</p>
                    <h2 style={{color :  "red"}}><span>-</span> <span>₦</span>{numeral(creditAmount).format('0,0.00')}</h2>
                </div>
            </>
            )
          }
            
        </div>
    
      {/* <div className="purchaseHBottom"></div> */}

     </div>
     

     <div className="purchaseBody">

     <div className="statusCon">
    <div className="all"  style={{ 
        color: "#EB232D", 
        borderBottom: "2px solid", 
        marginBottom: "-1px" }}>
                <p>Product</p>
            </div>

           </div>





     
<div className="purchaseBodyDetails">
         {products.map((item, id) => (
         <div className="purchaseBodyCon" key={id}>
           <div className="purchaseName">
           <p>{item.productName}</p> 
            <p><span>Qty : </span>{item.quantity}</p>
         </div>
           <div className="purchasePrice">
            <p><span>Price : ₦</span>{item.sellingPrice}</p>
           </div>

           <div className="purchaseTotalPrice">
            <p><span>Total Price : ₦</span>{item.totalAmount}</p>
           </div>
        </div>
         ))}
       </div>
      
     </div>

     </div>
        )}
   {/*========= show purchase end */}

    </div>
    </div>

    <ModalPayment isOpenPayment={isOpenPayment} handlePaymentModal={handlePaymentModal} handlePayment={handlePayment} amountPaid={amountPaid} setAmountPaid={setAmountPaid} setLoading={setLoading} loading={loading} makePayment={makePayment} print={ print}/>

{/* btn  receipt and btn flex */}
{!print && (

    
        status === "paid" ? (
            <div className="btnflexx">
            <div className="btn">
                <button onClick={printDoc}>
                print invoice
            </button>  
            </div>
            </div>
        ) : (
            <div className="btnflexx">
            <div className="btn">
                <button onClick={printDoc}>
                print invoice
            </button>  
            </div>

            <div className="btn" >
            <button onClick={handlePaymentModal}>
             make payment
         </button> 
         </div>
         </div>
        )
    
)}


{/* btn flex */}
    </div>
  )
}

export default ShowIssuedHistory