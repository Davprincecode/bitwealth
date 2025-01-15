import React, { useState } from 'react'
import SideMenu from './SideMenu';

function Homes() {
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

     <p className='barMenu' onClick={handleToggle}>click hammburger</p>

       <h1>Dashboard</h1>

       <div className="upperContainerWrapper">

       <div className="upperCon">
        <div className="upperConFlex">
            <div className="upperICon">
                <i className="fa-solid fa-tag"></i>
            </div>
            <div className="uppercontent">
                <h2>product</h2>
                <p>Number</p>
            </div>
        </div>
        <div className="containerNumber">
         <h4>12</h4>
        </div>
       </div>

       <div className="upperCon">
        <div className="upperConFlex">
            <div className="upperICon">
                <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="uppercontent">
                <h2>suppliers</h2>
                <p>Number</p>
            </div>
        </div>
        <div className="containerNumber">
         <h4>50</h4>
        </div>
       </div>


       <div className="upperCon">
        <div className="upperConFlex">
            <div className="upperICon">
                <i className="fa-solid fa-bullhorn"></i>
            </div>
            <div className="uppercontent">
                <h2>Blogs</h2>
                <p>Number</p>
            </div>
        </div>
        <div className="containerNumber">
         <h4>80</h4>
        </div>
       </div>

       </div>
       </div>
      
       </div>
    </div>
  )
}

export default Homes
