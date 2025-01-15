import  { useState } from 'react';
import {toast } from 'react-toastify';

        interface modalPopUp {
        isOpenPartPayment : Boolean;
        amountPaid : number;
        setAmountPaid : (name : number) => void;
        handlePartPaymentModal : (state : any) => void;
        handlePartPayment : (state : any) => void;
        setLoading : (name : boolean) => void;
        loading : boolean;
        } 
       


 const PartPaymentModal : React.FC<modalPopUp> = ({isOpenPartPayment, handlePartPaymentModal, handlePartPayment, amountPaid, setAmountPaid, setLoading, loading}) => {
    
            return (
        <>
            <div>
            <div className="modal-backdrop" onClick={handlePartPaymentModal} style={{ top : isOpenPartPayment ? "0%" : "-100%"}}>
            </div>
            <div className="modal-content" style={{ bottom : isOpenPartPayment ? "251px" : "-100%"}}>
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
                            handlePartPayment
                        } disabled={loading}>
                        {loading ? 'Adding...' : 'add product'}
                        </button>
                    ) : (
                        <button type="button" disabled={true}>
                        {loading ? 'Adding...' : 'add product'}
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

export default PartPaymentModal;