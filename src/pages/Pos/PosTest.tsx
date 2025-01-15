import React, { useEffect, useState} from 'react';
import { IoIosAdd, IoLogoApple } from "react-icons/io";
import { FiBox } from "react-icons/fi";
import { IoMdMore, IoMdClose } from "react-icons/io";
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import numeral from 'numeral';
import ModalPos from '../../component/ModalPos';
import Receipt from './Receipt';
import imgLoading from '../../assets/images/loadinggray.gif';
import { IoArrowBackCircle } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Preloader from '../../component/Preloader';
import { MdAddCircle } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

interface product {
    productId :  string;
    productName: string;
    userId :  string;
    quantity: number;
    price: number;
    totalAmount: number;
  }

interface cartsProduct {
    productId :  string;
    userId :  string;
    productName :  string;
    quantity: number;
    price: number;
    totalAmount: number;
  }

function PosTest() {
    const {baseUrl, token} = userAuth();
    const [productDb, setProductDb] = useState<product[]>([]);
    const [product, setProduct] = useState<product[]>([]);
    const [cartProduct, setCartProduct] = useState<cartsProduct[]>([]);
    const [sellProduct, setSellProduct] = useState<cartsProduct[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingProduct, setLoadingProduct] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState(false);
    const [printData, setPrintData] = useState(false);
    const [print, setPrint] = useState(false);
    const formattedTotalAmount = numeral(totalAmount).format('0,0.00');
    const [totalQty, setTotalQty] = useState(0);
    const [couponAmount, setCouponAmount] = useState(0);
    const [newCoupon, setNewCoupon] = useState(false);
    const [couponadd, setCouponAdd] = useState(false);
    const [transId, setTransId] = useState('');

    const [couponName, setCouponName] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);

    let discount = totalQty * couponAmount;
    let ground = totalAmount - discount;
    const grounddiscount = numeral(ground).format('0,0.00');
    
    useEffect(() => {
      fetchData();
      }, [currentPage]);

  const fetchTest = async () => {
        const myHeaders = new Headers();
myHeaders.append("Authorization", "Token 245db6495c5b8e911406952e32f72238693edba50520a558dbcf2aaf946fd15a");

const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};


fetch("http://127.0.0.1:8000/user/wh_mat_received_all/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
     }

  const fetchPost = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token 245db6495c5b8e911406952e32f72238693edba50520a558dbcf2aaf946fd15a");
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "purchase_id":"ps2024080417011924",
      "app_no": "PO-4293671",
      "po_number": "PO-4293671",
      "requester_name": "david manager",
      "requester_email": "obafemi@gmail.com",
      "warehouse_name": "warehouse 1",
      "department": "projects",
      "reciever_name": "mr john",
      "project_name": "davidson",
      "reason_for_request": "we need it in site",
      "remark": "good material",
      "products": [
        {
          "material_code": "mpryry001",
          "prod_name": "sand",
          "prod_description": "Asphalt roofing shingles for residential roofs",
          "approved_qty": 20,
          "inbound_qty": 10,
          "reject_qty": 0
        },
        {
            "material_code": "mpr001",
            "prod_name": "sand",
            "prod_description": "Asphalt roofing shingles for residential roofs",
            "approved_qty": 20,
            "inbound_qty": 10,
            "reject_qty": 0
          }
      ]
    });
    
    const requestOptions : RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://127.0.0.1:8000/user/wh_draft/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

const fetchData = async () => {
        setLoadingProduct(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        try {
          const response = await fetch(`${baseUrl}` + "/shopproduct/" + currentPage, requestOptions);
          const result = await response.json();
          
          setNextPageUrl(result.pagination.next_page_url);
          setPrevPageUrl(result.pagination.prev_page_url);
          // const updatedProducts = [...product];
          // result.data.forEach((newProduct: product) => {
          //   if (!updatedProducts.some((p) => p.productId === newProduct.productId)) {
          //     updatedProducts.push(newProduct);
          //   }
          // });
          setProduct(result.data);
          setProductDb(result.data);
          setLoadingProduct(false);
        } catch (error) {
        //   console.log(error);
        }
    };

  const searchProduct = async (searchValue : string) => {
      setLoadingProduct(true);
      if(searchValue ==""){
        fetchData();
      }else{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      try {
        const response = await fetch(`${baseUrl}` + '/searchproduct/' + searchValue, requestOptions);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json(); 

      
const searchProduct: product[] = [];

result.data.forEach((newProduct: product) => {
const existingProduct = product.find((p) => p.productId === newProduct.productId);

if (existingProduct) {
  searchProduct.push(existingProduct);
} else {
  searchProduct.push(newProduct);
}
});

setProduct(searchProduct);      
        setLoadingProduct(false);
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

const addToCart = (productId: string) => {
  const products = product.filter((item) => item.productId === productId);
  
  if(products[0].quantity > 0){
    if(products[0].quantity < 1){
  // console.log("helllo float");
    }else{
      if(products[0].quantity == 1){
      cartLogic(productId);
      // deleteProduct(productId);
      }else{
      cartLogic(productId);
      }
}}
};


const cartQuantity = (productId :  string, operation : string) => {
    const existingCartProduct = cartProduct.filter((item) => item.productId === productId);
    const productData = product.filter((item) => item.productId === productId);     
    if(productData[0].quantity > 0){
      if(productData[0].quantity < 1){
      //  console.log("helllo float");
      }else{
      if(operation == "+"){
      const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, 
          quantity: parseFloat((item.quantity + 1).toFixed(3)), 
          totalAmount: parseInt((item.price * parseFloat((item.quantity + 1).toFixed(3))).toFixed(0))
        }
        : item
      );
    const total = totalAmount + existingCartProduct[0].price;
    productLogic(productId, "-");
    setTotalAmount(total);
    setTotalQty(totalQty + 1);
    setCartProduct(updatedCartProduct);
    }
   if(operation == "-"){
      if(existingCartProduct[0].quantity == 1){
        deleteFromCart(productId, 1, existingCartProduct[0].price)
        const total = totalAmount - existingCartProduct[0].price;
       setTotalAmount(total);
      }else{
  const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, 
          quantity: parseFloat((item.quantity - 1).toFixed(3)), 
          totalAmount: parseInt((item.price * parseFloat((item.quantity - 1).toFixed(3))).toFixed(0))
        }
        : item
      );
    const total = totalAmount - existingCartProduct[0].price;
    productLogic(productId, "+");
    setTotalAmount(total);
    setTotalQty(totalQty - 1);
    setCartProduct(updatedCartProduct);
      } 
    }
  } 
  } else{
    // "your product is less than 1" 
    if(operation == "-"){
      if(existingCartProduct[0].quantity == 1){
        deleteFromCart(productId, 1, existingCartProduct[0].price)
        const total = totalAmount - existingCartProduct[0].price;
        setTotalQty(totalQty - 1);
       setTotalAmount(total);
      }else{
    const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, 
          quantity: parseFloat((item.quantity - 1).toFixed(3)), 
          totalAmount: parseInt((item.price * parseFloat((item.quantity - 1).toFixed(3))).toFixed(0))
        }
        : item
       );
    const total = totalAmount - existingCartProduct[0].price;
    productLogic(productId, "+");
    setTotalAmount(total);
    setTotalQty(totalQty - 1);
    setCartProduct(updatedCartProduct);
      } 
    }

  }

}


const cartQuantityInput = (productId :  string, qty : number) => {

  const existingProduct = productDb.find((item) => item.productId === productId);
  const cartData = cartProduct.find((item) => item.productId === productId);
  const prevTotal = totalAmount - (cartData?.totalAmount ?? 0);
  const prevQty = totalQty - (cartData?.quantity ?? 0);

  if(Number.isNaN(qty)){
    const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, quantity: 0, totalAmount: item.price * 0 }
        : item
      );
      const updatedProduct = product.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity: existingProduct?.quantity ?? 0,
            totalAmount: existingProduct?.totalAmount ?? 0,
          }
        : item
    );
      
    const cartTotal = 0;
    const total = prevTotal + cartTotal;
      setProduct(updatedProduct);
      setTotalAmount(parseFloat((total).toFixed(3)));
      setTotalQty(prevQty);
      setCartProduct(updatedCartProduct);

  }else{
  if (existingProduct) {
    if(qty <= existingProduct.quantity){
      
      const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, 
          quantity: qty, 
          totalAmount: parseFloat((item.price * qty).toFixed(3))}
        : item
      );

    const productTotalAmount = existingProduct.price * qty;

    const updatedProduct = product.map((item) =>
    item.productId === productId
      ? { ...item, quantity: parseFloat((existingProduct.quantity - qty).toFixed(3)), totalAmount: parseInt((item.price * parseFloat((existingProduct.quantity - 1).toFixed(3))).toFixed(0))
       }
      : item
    );
    const total = prevTotal + productTotalAmount;
    setTotalQty(prevQty + qty);
    setProduct(updatedProduct);
    setTotalAmount(parseFloat((total).toFixed(3)));
    setCartProduct(updatedCartProduct);
    }
  }else{
    // console.log("greter than");
  }}}

const cartLogic = (productId: string) => {
  const existingProduct = cartProduct.find((item) => item.productId === productId);
  if (existingProduct) {
    const updatedCartProduct = cartProduct.map((item) =>
      item.productId === productId
        ? { ...item, 
          quantity: parseFloat((item.quantity + 1).toFixed(3)), 
          totalAmount: item.price * (item.quantity + 1) 
        }
        : item
    );
    productLogic(productId, "-");
    const total = totalAmount + existingProduct.price;
    setTotalAmount(total);
    setCartProduct(updatedCartProduct);
  } else {
    const products = product.filter((item) => item.productId === productId);
    const newCartProduct = {
      productId: products[0].productId,
      userId: products[0].userId,
      productName: products[0].productName,
      quantity: 1,
      price: products[0].price,
      totalAmount : products[0].price * 1,
    } 
    const total = totalAmount + products[0].price;
    productLogic(productId, "-");
    setTotalAmount(total);
    setCartProduct([...cartProduct, newCartProduct]);
  }   
  setTotalQty(totalQty + 1);
}

const productLogic = (productId :  string, operation : string) => {
  if(operation == "+"){
    const updatedProduct = product.map((item) =>
    item.productId === productId
      ? { ...item, quantity: parseFloat((item.quantity + 1).toFixed(3)), totalAmount: item.price * (item.quantity + 1) }
      : item
  );
  setProduct(updatedProduct);
  }
  if(operation == "-"){
    const updatedProduct = product.map((item) =>
    item.productId === productId
      ? { ...item, quantity: parseFloat((item.quantity - 1).toFixed(3)), totalAmount: item.price * (item.quantity - 1) }
      : item
  );
  setProduct(updatedProduct);
  }  
}

const deleteProduct = (productId: string) => {
  const products = product.filter((item) => item.productId !== productId);
  setProduct(products);
}

const deleteFromCart = (productId: string, qty : number, price : number) => {
const products = cartProduct.filter((item) => item.productId !== productId);

const updatedProduct = product.map((item) =>
  item.productId === productId
    ? { ...item, quantity: item.quantity + qty, totalAmount: item.price * (item.quantity + qty) }
    : item
);

const total = totalAmount - price * qty;
const discountQty = totalQty - qty;
setTotalAmount(total);
setTotalQty(discountQty);
setProduct(updatedProduct);
setCartProduct(products);
}

const getCoupon = async () => {
  setCouponAdd(true);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", token);
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const response = await fetch(`${baseUrl}` + '/getcoupon/' + couponName, requestOptions);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
    const result = await response.json();
    setCouponAmount(result.data.couponAmount);
    setCouponAdd(false);
    toast.success("Discount Added");
  } catch (error) {
    setCouponAdd(false);
    if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
      toast.error("discount not found");        
    } else {
      toast.error('An unknown error occurred.');
    }
  }


}


const handlePurchase = async (purchaseType : string) => {

  if (cartProduct.length > 0) {  
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     myHeaders.append("Authorization", token);
    const raw = {
      "goodsPurchase" : cartProduct,
      "purchaseType" : purchaseType,
      "discount" : discount,
      "totalAmount" : totalAmount
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
    };
  
    try {
      const response = await fetch(`${baseUrl}/sellproduct`, requestOptions); 
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      setTransId(responseJson.transactionId);
      setLoading(false);
      setSellProduct(cartProduct);
      setCartProduct([]);
      setIsOpen(true);
      setPrintData(!printData);
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

useEffect(() => {
  if (print) {
    window.print();
    setPrintData(!printData)
    setIsOpen(!isOpen)
    setPrint(!print)
    setTotalAmount(0)
    setCouponAmount(0)
    setTotalQty(0)
    setNewCoupon(false)
    fetchData()
  }
}, [print]);

const printReceipt = () => {
  setIsOpen(!isOpen)
  setPrint(!print)
}
const cancelPrintReceipt = () => {
  setIsOpen(!isOpen)
  setPrintData(!printData)
  setTotalAmount(0)
  setCouponAmount(0)
  setTotalQty(0)
  setNewCoupon(false)
  fetchData()
  }


  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl !== null) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
      <>
      {
        printData ? (
         <>
         <Receipt sellProduct={sellProduct} totalAmount={totalAmount} discount={discount} ground={ground} couponAmount={couponAmount} transId={transId}/>
        
          { 
          isOpen &&  ( 
            <ModalPos isOpen={isOpen} handleModal={cancelPrintReceipt} printReceipt={printReceipt}/>
            )
          }
          
          </>
        

        ) : (
          <div>
        <div className="posHeader">

        <NavLink to='/pos-dashboard' >
          <div className="backIcon">
            <IoArrowBackCircle />
          </div>
          </NavLink>

          <div className="headerTitle">
            john top foods
          </div>
          <div className="dottedIcon">
          <IoMdMore />
          </div>
      </div>

      {/* =============== */}

      <div className="posmainwrapper">

        {/* selected item */}
        <div className="posSelectItem">

            <div className="tablecontainer">
            <table className="trbdy">
                <tbody>
                    <tr>
                    <th>name</th>
                    <th>qty</th>
                    <th>price</th>
                    <th>total</th>
                    <th>action</th>
                    </tr>
            {
              cartProduct.map((item, index)=>(
           <tr key={index}>
            <td className="productname0">
            {item.productName}        
            </td>

                <td className="productquantity0">
                    <div className="productCount">
                    <div className="minus" onClick={() => cartQuantity(item.productId, "-")}>-</div>
                    {/* {item.quantity} */}
                    <div className="input">
                      <input 
                      type="number" 
                      step="0.001"
                      value={item.quantity}
                      onChange={(e) => cartQuantityInput(item.productId, parseFloat(e.target.value))} 
                      style={{
                        marginTop: "0px",
                        borderRadius: "5px",
                        textAlign: "center"
                        }}/>
                    </div>
                    <div className="plus"  onClick={() => cartQuantity(item.productId, "+")}>+</div>
                    </div>
                </td>
                    <td className="unitprice0">
                    {item.price}
                    </td>

                <td className="totalprice0" id="totalPrice270189">
                {item.totalAmount}
                </td>

                <td>
                    <div className="delete" onClick={(e) => deleteFromCart(item.productId, item.quantity, item.price)}>
                    <IoMdClose />
                    <div className="angle" >
                    <div className="right-arr" ></div>
                    <div className="left-arr" > </div>
                    </div>
                    </div>
                </td>

                </tr>
              ))
            }
            </tbody>
                </table>
            </div>

         <div className="totalcontainer">

        <div className="subtotalflex">
          <p>subtotal</p>
          <p id="totalSumPrice">
              {totalAmount}       
          </p>
      </div>

      { couponAmount > 0 && (
            <div className="subtotalflex">
            <p>discount</p>
            <p id="totalSumPrice">
                {discount}  
            </p>
            </div> 
         )
      }
      
    <div className="vat">
      {newCoupon && (
          <p className='newCoupon'>
          <div className="input">
            <input type="text" style={{
              marginTop : "0px",
              width : "100%",
              borderRadius: "5px"
            }}
            onChange={(e) => {
              setCouponName(e.target.value);
            }}
            />
          </div>
           {
           couponadd ? (
            <div>
             <p>add.......</p>
          </div>
           ) : (
          <div className="icon"  onClick={getCoupon}>
             <MdAddCircle />
             <p>add</p>
          </div>
           )
           }
          </p>  
      )
      }
      

       <div className="addCoupon" 
           onClick={()=>setNewCoupon(!newCoupon)} 
           style={{
            background: "#e6482d",
            padding: "8px",
            textTransform: "capitalize",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
               }}
        >
        add coupon
       </div>

    </div>


    <div className="groundtotal">
        <p>groundtotal</p>
        <p id="groundTotalPrice">
          {
            couponAmount > 0 ?
            (
                grounddiscount
            ) : (
              formattedTotalAmount
            )
          }
        </p>
    </div>
          </div>
          
          <div className="paymentflex">
        {
          loading ? (
        <div className="cash">
              loading....
        </div>
          ) : (
        <div className="cash" onClick={() => handlePurchase("cash")}>
                    cash
          </div>
          )
        }
         
       {
          loading ? (
        <div className="transfer" >
                  loading....
          </div>
          ) : (
        <div className="transfer" onClick={() => handlePurchase("transfer")}>
           transfer
        </div>
          )
        }
     </div>
        </div>

         {/* selected item end */}


{/* pos main container */}
        <div className="posMainContainer">

        <div className="searchflex">
        <div className="input">
        <input type="text" id="inputdata" className="searchItem" name="" placeholder="search an item"  onChange={(e) => searchProduct(e.target.value)}/>
        </div>
        </div>

    {
      loadingProduct ? (
     <Preloader />
      ) : (
        <div className="posProductCon">
        {
         product.map((item, id) => (

    <div className="posProduct" key={id}>
    <div className="productIcon">
    <FiBox />
    </div>

    <div className="productNameCon">
        <p id="productName">{ item.productName }</p>
        <p>Quantity <span>{ item.quantity }</span></p>
    </div>
    
    <div className="posProductPrice">
        <div className='currency'> 
        ₦
       </div> 
       { item.price }
    </div>

    <div className="sell" onClick={(e) => addToCart(item.productId)}>
    <div className="productBtn" >
        sell
    </div>
    </div>

    </div>
            ))
        }
    

    </div>
      )
    }
    
    
    <div className="scrollFlex">  
            {prevPageUrl !== null && (
              <button onClick={handlePrevPage}>Previous</button>
            )}
            {nextPageUrl && <button onClick={handleNextPage}>Next</button>}
        {/* </div> */}
    </div>

    </div>
        {/* pos main container end */}

      </div>
    
    </div>
     )}
    </>
  )
}
export default PosTest

