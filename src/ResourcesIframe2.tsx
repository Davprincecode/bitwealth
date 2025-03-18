import React, { useState } from 'react'
import SideMenu from './component/SideMenu'
import TopHeader from './component/TopHeader'
import rpdf from './assets/resources/resources1.pdf'
import logo from './assets/images/logo.jpeg'
import { NavLink } from 'react-router-dom'
import { FaLongArrowAltLeft } from 'react-icons/fa'


function ResourcesIframe2() {

  const [navBar, setNavBar] = useState<boolean>(false);
  const handleToggle = () => {
    setNavBar(!navBar);
  };

  return (
    <div>
      <div className="mainWrapper">

<div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
</div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='resources' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">
    <div className="iframeWrapper">
    {/* <iframe
  src="assest/resources/resources1.pdf#toolbar=0"
  width="100%"
  height="100vh"
  style={{
    height: "100vh",
  }}
/> */}


<div className="responsive-iframe">
  
<div className="imgPreview">
  <img src={logo} alt="" />
</div>
<iframe 
    src="https://drive.google.com/file/d/1wVNZxMAgg-2rV02Ib8eXqmurbrwwNsbY/preview?embedded=true" 
    width="100%" 
    height="440px" 
    allowFullScreen
    style={{ border: "none", overflow: 'hidden' }}
    >
</iframe>
<div className="nextPageCon">
  <div className="NavPageLink">
    <NavLink to="/resource">Prev Page</NavLink>
  </div>
  <div className="icon">
    <FaLongArrowAltLeft />
  </div>
</div>


</div>

      </div>
   </div>

   
       </div>
       </div>
    </div>
  )

  
}

export default ResourcesIframe2
