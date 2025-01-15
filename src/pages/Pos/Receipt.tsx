import React from 'react'
import numeral from 'numeral';
import logo from '../../assets/images/johntopLogo.png';
import { userAuth } from '../context/AuthContext';


interface modalPopUp {
  sellProduct : cartsProduct[],
  totalAmount :  number,
  discount: number,
  ground :  number,
  couponAmount: number,
  transId : string,
}

interface cartsProduct {
  productId :  string;
  userId :  string;
  productName :  string;
  quantity: number;
  price: number;
  totalAmount: number;
}

const Receipt : React.FC<modalPopUp> = ({sellProduct, totalAmount, discount, ground, couponAmount, transId }) => {
  const {fullName} = userAuth();
    const total = numeral(totalAmount).format('0,0.00');
    const groundTotal = numeral(ground).format('0,0.00');
    // setTotalAmount
    const newdate = new Date();
  const date = newdate.toLocaleString();
    return (
      <div className="receipt">

        <div className="receiptHeader">
          <div className="receiptLogo">
            <img src={logo} />
          </div>
        <h2>JohnTop Foods</h2>
        <p>address : Zone E Block 7 shop 3 Beside</p>
        <p>OGD Tutors OAU Central Market, OAU Ile-Ife, Osun State</p>
        <p>Receipt No <span>{transId}</span></p>
        <p>telephone :  08057386375</p>
        <div className="issued">
          <p>Issued By : <span>{fullName}</span></p>
        </div>
        <p>{date}</p>
        </div>
        

        {/* <div className="dotLine"></div> */}
      
 {/* ================================ */}
 <div className='table-con'>
  
<table className="styled-table receipt-styled-table">
    <thead>
        <tr style={{backgroundColor: "#bcb5b5", color: "#000"}}>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>total</th>
        </tr>
    </thead>
    <tbody>
{
  sellProduct.map((item, index)=>(
<tr key={index}  style={{backgroundColor: "#bcb5b5", color :" #000000"}}>
        <td>{item.productName}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{item.totalAmount}</td>
    </tr> 
  )
)
}
  
    </tbody>
</table>
    </div>
    {/* =========================================== */}

    
{
  couponAmount > 0 ? (
    <>
    <div className="dotLine"></div>

    <div className="summary">
      <h4>Sub Total</h4> 
      <p>₦ {total}</p>
   </div>
    <div className="summary">
      <h4>Discount</h4> 
      <p>₦ {discount}</p>
   </div>
    <div className="summary">
      <h2>Total</h2> 
      <p>₦ {groundTotal}</p>
    </div>
    <div className="dotLine"></div>
    </>
  ) : (
    <>
    <div className="dotLine"></div>
    <div className="summary">
      <h2>Total</h2> 
      <p>₦ {groundTotal}</p>
    </div>
    <div className="dotLine"></div>
    </>
  )
}
       
        <div className="thank-you">
          <h3>Thanks for your patronage!</h3>
          <p>website : <span>johntopfoods.com</span></p>
        </div>
        
      </div>
    );
  }

export default Receipt
