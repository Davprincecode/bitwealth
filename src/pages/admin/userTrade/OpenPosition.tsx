import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { userAuth } from '../../context/AuthContext';

interface usersInterface { 
    entryPrice :  string;
    breakEvenPrice : string;
    initialMargin : string;
    leverage : string;
    liquidationPrice : string;
    marginAsset : string;
    markPrice : string;
    positionAmt : string;
    positionSide : string;
    unRealizedProfit : string;
    positionInitial_margin : string;
    updateDate : string;

  }
  interface posProp {
    userId :  string | undefined;
  }
const OpenPosition : React.FC<posProp> = ({userId}) => {

    const [openPosition, setOpenPosition] = useState<usersInterface[]>([]);
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
              const response = await fetch(`${baseUrl}/open_position/${userId}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
              const result = await response.json();
              setOpenPosition(result.data);
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
                        <th>entryPrice</th> 
                        <th>breakEvenPrice</th>
                        <th>initialMargin</th>
                        <th>leverage</th>
                        <th>liquidationPrice</th>
                        <th>marginAsset</th>
                        <th>markPrice</th>
                        <th>positionAmt</th>
                        <th>positionSide</th>
                        <th>unRealizedProfit</th>
                        <th>positionInitial_margin</th>
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
                openPosition.length > 0 ? (
                    openPosition.map((data, id) => (
                        <tr  key={id}>
                           <td>{id + 1}</td>
                            <td>{data.entryPrice}</td>
                            <td>{data.breakEvenPrice}</td>
                            <td>{data.initialMargin}</td>
                            <td>{data.leverage}</td>
                            <td>{data.liquidationPrice}</td>
                            <td>{data.marginAsset}</td>
                            <td>{data.markPrice}</td>
                            <td>{data.positionAmt}</td>
                            <td>{data.positionSide}</td>
                            <td>{data.unRealizedProfit}</td>
                            <td>{data.positionInitial_margin}</td>
                            <td>{data.updateDate}</td>
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

export default OpenPosition
