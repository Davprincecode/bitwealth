// import React from 'react'

import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { baseUrl, imageUrl} from '../apis/fetchData';


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

function BlogDetails() {
const { blogId } = useParams();
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
        const response = await fetch(`${baseUrl}` + '/blog/' + `${blogId}`, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseDetails = await response.json();
        console.log('blog API Response:', responseDetails);

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
    <>
   {blogs.map((item, index)=>(
     <div className='blogDetails' key={index}>
   <div className="blogBodyDetails">
    <div className="blogDetailsHeader">
        <h1>{item.blogTitle}</h1>
    </div>

    
    <div className="blogDetailImg">
   
    <div className="blogImgCon">
        <img src={`${imageUrl}${item.blogMedia}`} alt="" />
    </div>

    </div>

     </div>
     {/* ====================== */}
     <div className="blogDetailsPost">
        <p>{item.blogContent}</p>
     </div>

    </div>
    ))}
</>
  )
}

export default BlogDetails