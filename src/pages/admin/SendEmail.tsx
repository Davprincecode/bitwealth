import {useState } from 'react'

import {toast } from 'react-toastify';
import { userAuth } from '../context/AuthContext';
import SideMenu from '../../component/SideMenu';
import TopHeader from '../../component/TopHeader';


function SendEmail() {
 
  const [navBar, setNavBar] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token} = userAuth();  

  const handleToggle = () => {
    setNavBar(!navBar);
  };

  const handleLogin = async () => {
    setLoading(true);
    const raw = {
      'user' : "all",
      'subject' : subject,
      'message' : message
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/senduseremail`, requestOptions);
      const res = await response.text();
        console.log(res);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const responseJson = await response.json();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };


  
  return (
    <div>
      <div className="mainWrapper">

<div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
</div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='send email' handleToggle={handleToggle}/>
  </div> 
    {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

   <div className="formWrapper">
   <div className="formCon">

      <form>

          <div className="input">
          <label >subject</label>
          <input type="text" value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          />
          </div>

          <div className="input">
          <label >message</label>
          <textarea name="" id="" value={message} 
          onChange={(e) => setMessage(e.target.value)}>
          </textarea>
          </div>
          <div className="input">

          <div className="btn">
          {
            subject && message  ? (
              <button onClick={handleLogin} disabled={loading}>
              {loading ? 'Loading......' : 'Send'}
              </button>
          ) : (
              <button disabled={true}>
              {loading ? 'Loading......' : 'Send'}
              </button>
          )
          }
          </div>
          </div>


      </form>
    </div>
    </div>
   </div>


       </div>
       </div>
    </div>
  )
}

export default SendEmail
