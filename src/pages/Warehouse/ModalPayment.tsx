import  { useState } from 'react';
import {toast } from 'react-toastify';

    interface modalPopUp {
        isOpenPayment : Boolean;
        amountPaid : number;
        setAmountPaid : (name : number) => void;
        handlePaymentModal : (state : any) => void;
        handlePayment : (state : any) => void;
        setLoading : (name : boolean) => void;
        loading : boolean;
        makePayment : () => void;
        print : boolean;
    } 
       
 const ModalPayment : React.FC<modalPopUp> = ({isOpenPayment, handlePaymentModal, handlePayment, amountPaid, setAmountPaid, setLoading, loading, makePayment, print }) => {
    
            return (
        <>
            <div>

            {!print && (
          <div className="modal-backdrop" onClick={handlePaymentModal} style={{ top : isOpenPayment ? "0%" : "-100%"}}></div> 
            )}

            

            <div className="modal-content" style={{ bottom : isOpenPayment ? "251px" : "-100%"}}>
            <div className="header">
                <h4>part payment</h4>
            </div>

            <div className="modalBody">
            <form >
                <div>
                    <label >Amount Paid</label>
                    <input 
                      type="number" 
                      step="0.001"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(parseFloat(e.target.value))} 
                      style={{
                        marginTop: "0px",
                        borderRadius: "5px",
                        textAlign: "center"
                        }}/>
                </div>
        
        <div className="btn">
            {
                    amountPaid > 0 ? (
                        <button type="button" onClick={
                            makePayment
                        } disabled={loading}>
                        {loading ? 'Adding...' : 'make payment'}
                        </button>
                    ) : (
                        <button type="button" disabled={true}>
                        {loading ? 'Adding...' : 'make payment'}
                        </button>
                    )
                }
        </div>

        </form>
            </div>


            </div>

        </div>
        
        </>
    );
};

export default ModalPayment;