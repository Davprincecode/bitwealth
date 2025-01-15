import { useState } from 'react'
import { FiAlignRight } from 'react-icons/fi';
import {toast } from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import SideMenu from '../../component/SideMenu';


function AddExpenses() {
    const { purchaseId } = useParams();
  
    const [navBar, setNavBar] = useState<boolean>(false);

    const [expensesName, setExpensesName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);


    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();

    const handleLogin = async () => {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Authorization", token);
        const raw = {
            "purchaseId" : purchaseId,
            "expenses" : [
              {
            "expensesName" : expensesName,
            "amount" : amount  
              }
            
            ]  
        };
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
        };
      
        try {
          const response = await fetch(`${baseUrl}/expenses`, requestOptions);
          
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          const responseJson = await response.json();
          setLoading(false);
          toast.success("Expense added successfully!");
            setExpensesName('');
            setAmount(0);
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
                <h1>Add Expenses</h1>
            </div>
             
             {/* ==========main container wrapper ============= */}
           <div className="mainContainerWrapper">
    
           <form >
        <div>
            <label>Expenses Name</label>
            <input type="text" placeholder='Enter Expenses Name' value={expensesName} onChange={(e) => setExpensesName(e.target.value)}/>
        </div>

        <div>
            <label>Amount</label>
            <input type="number" placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
        </div>
    
        <div className="btn">
            {
                     expensesName && amount ? (
                        <button onClick={handleLogin} disabled={loading}>
                          {loading ? 'Adding...' : 'Add'}
                        </button>
                      ) : (
                        <button disabled={true}>
                          {loading ? 'Adding...' : 'Add'}
                        </button>
                      )
                  }
        </div>
    
          </form>
        </div>
        </div>
        </div>
      )
}

export default AddExpenses