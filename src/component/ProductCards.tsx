import { useEffect, useState } from "react";
import { baseUrl, imageUrl } from "../apis/fetchData";

interface Product {
  productId: number;
  productName: string;
  productWeight: number;
  productSize: string;
  productPrice: number;
  productImage: string;
}

interface ApiResponse {
  requestSuccessful: boolean;
  responseMessage: string;
  responseBody: Product;
}

function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(`${baseUrl}/products`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseDetails = await response.json();
        

        if (responseDetails.data) {

          const extractedProducts = responseDetails.data
            .filter((item: ApiResponse) => item.requestSuccessful)
            .map((item: ApiResponse) => item.responseBody);

          setProducts(extractedProducts);
        } else {
          setError("Invalid response format");
        }
      } catch (error: any) {
        setError(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cardsParentCon" id="cardsParentCon">
      <div className="cardsHeader">
        <h1>Some of our products</h1>
      </div>
      <div className="cardsParent">
        {products.map((item, index) => (
          <div className="cardsItems" key={index}>
            <div className="productImg">
              <img src={`${imageUrl}${item.productImage}`} alt={item.productName} />
            </div>
            <div className="productDetails">
              <div className="productName">
                <h4>{item.productName}</h4>
              </div>
              <div className="productWeight">
                <h5>{item.productWeight}{item.productSize}</h5>
              </div>
              <div className="productPrice">
                <h4>₦{item.productPrice}</h4>
              </div>
            </div>
            <div className="cardBtn">
              <div className="btn">
                <p>
                  <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/2348057386375?text=Hello, I want to buy ${item.productName} ${item.productWeight}${item.productSize}`}>
                    Order
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
