import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';

interface usersInterface { 
        commission:  string;
        commissionAsset:  string;
        date:  string;
        orderId:  string;
        positionSide:  string;
        price:  string;
        qty:  string;
        quoteQty:  string;
        realizedPnl:  string;
        side:  string;
        symbol:  string;
  }
  interface posProp {
    userId :  string | undefined;
  }

const FutureTradeHistory : React.FC<posProp> = ({userId}) => {

    const [trade, setTrade] = useState<usersInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
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
              const response = await fetch(`${baseUrl}/trade_history/${userId}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
              console.log(result.data);
              
              setTrade(result.data);
              setLoading(false);
            } catch (error) {
              
                setLoading(false);
                if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                  // toast.error(error.message);
                } else {
                  toast.error('An unknown error occurred.');
                }
              }
          
        };
        fetchData();
      }, []);

  return (
    <div>
      
     
      <div className="container-body">
                <div className="table-responsive">
                   <table>
                    <thead>
                    <tr >
                        <th>No</th>
                        <th>symbol</th> 
                        <th>price</th>
                        <th>quantity</th>
                        <th>quote quantity</th>
                        <th>position side</th>
                        <th>side</th>
                        <th>realizedPnl</th>
                        <th>date</th>
                    </tr>
                    </thead>

                    <tbody >
                {
                 loading ? (
                    <tr>
                      <td colSpan={7} className='emptyTd'>Loading....</td>
                  </tr>
              ) : (
                trade.length > 0 ? (
                    trade.map((data, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td>
                            <td>{data.symbol}</td>
                            <td>{data.price}</td>
                            <td>{data.qty}</td>
                            <td>{data.quoteQty}</td>
                            <td>{data.positionSide}</td>
                            <td>{data.side}</td>
                            <td>{data.realizedPnl}</td>
                            <td>{data.date}</td>
                        </tr>
                    ))
                    ) : (
                      <tr>
                          <td colSpan={7} className='emptyTd'>No Future History</td>
                      </tr>
                  )
                  )
                }                        
                    </tbody>
                    </table> 
                </div>
    </div>


    </div>
  )
}

export default FutureTradeHistory
