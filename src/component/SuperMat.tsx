
import { baseUrl, imageUrl} from '../apis/fetchData';
import { useEffect, useState } from "react";


interface supplier {
  supplierLogo: string;
  }
  
  interface ApiResponse {
    requestSuccessful: boolean;
    responseMessage: string;
    responseBody: supplier;
  }
function SuperMat() {
  const [Suppliers, setSuppliers] = useState<supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(`${baseUrl}/supplier`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseDetails = await response.json();
        console.log('blog API Response:', responseDetails);

        if (responseDetails.data) {

          const extractedProducts = responseDetails.data
            .filter((item: ApiResponse) => item.requestSuccessful)
            .map((item: ApiResponse) => item.responseBody);

          setSuppliers(extractedProducts);
        } else {
          setError("Invalid response format");
        }
      } catch (error: any) {
        setError(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="superMat">
      <div className="superHeader">
        <h1>Supermarket We Supply</h1>
    </div> 
    <div className="superDetails">

     {Suppliers.map((items, index)=>(
       <div className="superLogo" key={index}>
            <img src={`${imageUrl}${items.supplierLogo}`} alt="" />
         </div>
     ))}
 
    </div>
    </div>
    
  )
}

export default SuperMat