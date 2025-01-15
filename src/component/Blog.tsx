import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl, imageUrl } from "../apis/fetchData";

interface Blog {
blogId: string;
blogTitle: string;
blogContent: string;
blogMedia: string;
}

interface ApiResponse {
  requestSuccessful: boolean;
  responseMessage: string;
  responseBody: Blog;
}

function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch(`${baseUrl}/blog`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseDetails = await response.json();
        

        if (responseDetails.data) {

          const extractedProducts = responseDetails.data
            .filter((item: ApiResponse) => item.requestSuccessful)
            .map((item: ApiResponse) => item.responseBody);

          setBlogs(extractedProducts);
        } else {
          setError("Invalid response format");
        }
      } catch (error: any) {
        setError(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="blogMainCon">

    <h1>My Blog</h1>

      <div className="blogMain">

{/* ======================= */}
       {blogs.map((item, index)=>(
        <div className="blog" key={index}>
          <Link to={`/blogdetails/${item.blogId}`}>
         <div className="blogImg">
            <img src={`${imageUrl}${item.blogMedia}`} alt={item.blogMedia} />
         </div>
         <div className="blogContent">
            <div className="blogTitle">
                <h1>{item.blogTitle}</h1>
            </div>
            <div className="blogBody">
                <p>{item.blogContent.slice(0, 250)} ...</p>
            </div>

            <div className="blogBtnFlex">
            <div className="blogBtn btn">
            <p>read more</p>
            <FontAwesomeIcon icon={faArrowRight} />
            </div>
            </div>

         </div>
         </Link>
       
        </div>
       ))}
        
{/* ====================== */}


      </div>
    </div>
  )
}

export default Blog
