import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/johntopLogo.png';
import { FiX } from 'react-icons/fi';
import { RiHome2Fill } from "react-icons/ri";
import { LuFileBarChart } from "react-icons/lu";
import { MdInventory } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoIosSettings, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { userAuth } from '../pages/context/AuthContext';

interface Props {
    navBar: boolean;
    handleToggle: () => void;
  }

  interface SubNavOptions {
    "My Application": { title: string; path: string; }[];
    Report: { title: string; path: string; }[];
    "My Inventory": { title: string; path: string; }[];
  }
  
  interface RoleSubNavOptions {
    [key: string]: SubNavOptions;
  }


  interface MenuItem {
    title: string;
    path: string;
    icon?: JSX.Element;
    subNavOption?: {
      title: string;
      path: string;
    }[];
  }
  const SideMenu: React.FC<Props> = ({ navBar, handleToggle }) =>
    {

const {userType} = userAuth();
    
const role = userType;

const roleSubNavOptions: RoleSubNavOptions = {
manager : {
        "My Application" : [
          { 
            title: 'Material Recieve', 
            path: '/material' 
          },
          {
            title : 'expenditure',
            path : '/shopexpenditure'
          }
       
        ],
        "Report" : [
               {
                title : 'Transaction',
                path : '/users/mg-transaction'
                },
                {
                title : 'sales',
                path : '/users/mg-sales'
                },
                {
                title : 'Currency (cash)',
                path : '/users/mg-cash'
                },
                {
                title : 'E-Money (transfer or pos)',
                path : '/users/mg-transfer'
                }
        ],
        "My Inventory" : [
               {
                title : 'My warehouse',
                path : '/myStock'
                },
                {
                title : 'My expenses',
                path : '/myexpenditure'
               },

        ]
      },
procurement : {
    "My Application" : [

        { 
            title: 'new purchase', 
            path: '/sendproduct' 
        },
        { 
            title: 'new expenses', 
            path: '/expenses' 
        }
        
      ],
      "Report" : [
        { 
            title: 'purchase status', 
            path: '/purchasestatus' 
        }
      ],
      "My Inventory" : [
           {
              title : 'purchase history',
              path : '/purchasehistory'
              }
      ]
  },
shopPos: {
    "My Application" : [
        { title: 'point of sales', path: '/pos' }
      ],
      "Report" : [
             {
              title : 'Transactions',
              path : '/postransaction'
              },
              {
              title : 'Currency (cash)',
              path : '/poscash'
              },
              {
              title : 'E-Money (transfer or pos)',
              path : '/postransfer'
              }
      ],
      "My Inventory" : [
            //  {
            //   title : 'stock',
            //   path : '/myStockPos'
            //   },
              {
              title : 'sales',
              path : '/possales'
              }
      ]
  },

warehouse: {
    "My Application" : [
      {
        title : 'New Product',
        path : '/addtostock'
      },
      {
        title : 'Issue Product',
        path : '/issueProduct'
      },
      {
        title : 'Issue To Shop',
        path : '/issueToShop'
      },
      {
        title : 'new expenses',
        path : '/newexpenses'
      },
      {
        title : 'minor sale',
        path : '/minorsales'
      },
      
      ],
      "Report" : [
        {
          title : 'issued history',
          path : '/myIssuedHistory'
        },

        {
          title : 'minor sales history',
          path : '/salesreport'
        },

        {
          title : 'issue to shop history',
          path : '/shopreport'
        }
        
      ],

      "My Inventory" : [
        {
          title : 'stock',
          path : '/mystockwarehouse'
          },
          {
          title : 'expenditure',
          path : '/myExpenditureWare'
          }
      ]
  },

};

const menuItems: MenuItem[] = userType !== "" ? ([
  {
      title : 'Dashboard',
      path : role == "manager" ? "/mg-dashboard" : role == "procurement" ? "/pr-dashboard" : role == "warehouse" ? "/warehouse-dashboard" : "/pos-dashboard",
      icon : <RiHome2Fill />  
  },
  {
    title : 'My Application',
    path : '/#',
    icon : <IoIosSettings />,
    subNavOption : roleSubNavOptions[role]?.["My Application"]
    },
  {
    title : 'Report',
    path : '/#',
    icon : <LuFileBarChart />,
    subNavOption : roleSubNavOptions[role]["Report"]
  },
  {
    title : 'My Inventory',
    path : '/#',
    icon : <MdInventory />,
    subNavOption : roleSubNavOptions[role]["My Inventory"] 
  },
  {
      title : 'signout',
      path : '/logout',
      icon : <TbLogout />
  }
]) :([]);

    const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
    const toggleSubMenu = (currentIndex: number) => {
        setOpenSubMenuIndex(prevIndex => (prevIndex === currentIndex ? null : currentIndex));
    };


  return (

<div className={navBar ? "sideNavActive" : "sideNav"}>
 <div className="harmburger" onClick={handleToggle}>
 <FiX />
  <i className="fa-solid fa-bars-staggered"></i>
 </div>
<div className="sideNavLogoContainer">
{/* <NavLink to="{{ route('index') }}"> */}
 <div className="sideNavLogo">
    <img src={logo} alt="" />
 </div>
{/* </NavLink> */}
 <p>JohnTop Foods</p>
</div>
 <div className="sideNavMenu">
    <ul>
{/* className="active" */}
    {menuItems.map((menuItem, index) => (
        <li  key={index} style={{backgroundImage : openSubMenuIndex === index ? 'linear-gradient(135deg,#eb232d,#de8b2d)' : 'none'}}>
        {menuItem.subNavOption ? (
            <div>
        <div className="topmenu">
         {menuItem.icon}
          <NavLink to=" " className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <span>{menuItem.title}</span>
          </NavLink>
          {openSubMenuIndex === index ? (
             <IoMdArrowDropdown onClick={() => toggleSubMenu(index)}/>
            ) : (
             <IoMdArrowDropup onClick={() => toggleSubMenu(index)}/>
            )}  
          </div>
        <ul className="submenu" style={{display : openSubMenuIndex === index ? 'block' : 'none'}}>
        {menuItem.subNavOption.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink to={subItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <span>{subItem.title}</span>
                    </NavLink>
                  </li>
            ))}
        </ul>
        </div>
         ) : (
         <div className="topmenu">
         {menuItem.icon}
          <NavLink to={menuItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <span>{menuItem.title}</span>
          </NavLink>
          </div>
        )}
        </li>
    ))}
    </ul>
 </div>
</div>


  )
}

export default SideMenu