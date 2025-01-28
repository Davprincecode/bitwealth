import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FiX } from 'react-icons/fi';
import { RiHome2Fill } from "react-icons/ri";
import { LuFileBarChart } from "react-icons/lu";
import { MdInventory } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoIosLogOut, IoIosSettings, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { userAuth } from '../pages/context/AuthContext';
import { FaChartLine, FaUserAlt, FaUsers } from 'react-icons/fa';
import { FcComboChart } from 'react-icons/fc';
import { IoLogOut } from 'react-icons/io5';

interface Props {
  navBar: boolean;
  handleToggle: () => void;
}

interface SubNavOptions {
  [key: string]: { title: string; path: string; }[];
}

interface MenuItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  subNavOption?: SubNavOptions;
}

const SideMenu: React.FC<Props> = ({ navBar, handleToggle }) => {
  const { role } = userAuth();  
  const menuItems: MenuItem[] = [];
  if (role === 'admin') {
    menuItems.push(
      {
        title: 'Dashboard',
        path: '/admin-dashboard',
        icon: <RiHome2Fill />
      },
      {
        title: 'Users',
        path: '/#',
        icon: <FaUsers />,
        subNavOption: {
          "All Users": [{ title: 'All Users', path: '/all-users' }],
          "Pending Kyc": [{ title: 'pending kyc', path: '/pendingkyc' }],
          "Pending Payments": [{ title: 'Pending Payments', path: '/pendingpayments' }],
        }
      },
      {
        title: 'Trade Signal',
        path: '/#',
        icon: <FaChartLine />,
        subNavOption: {
          "Create Signals": [{ title: 'Create Signal', path: '/create-signal' }],
          "All Signals": [{ title: 'All Signals', path: '/trade-history' }],
        }
      },
 
      // {
      //   title: 'trade history',
      //   path: '/#',
      //   icon: <IoIosSettings />,
      //   subNavOption: {
      //     "admin mat": [{ title: 'Material Recieve', path: '/material' }],
      //     "Expenditure": [{ title: 'Expenditure', path: '/shopexpenditure' }]
      //   }
      // },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Crypto News": [{ title: 'Crypto News', path: '/crypto-news' }],
          "Trade History": [{ title: 'Trade History', path: '/trade-history' }]
        }
      },
      {
        title: 'Log out',
        path: '/logout',
        icon : <IoLogOut />
      }
    );
  } else if (role === 'trade club') {
    menuItems.push(
      {
        title: 'Dashboard',
        path: '/trade-club-dashboard',
        icon: <RiHome2Fill />
      },
      {
        title: 'Trade signal',
        path: '/#',
        icon: <IoIosSettings />,
        subNavOption: {
          "Trade Signals": [{ title: 'Trade Signals', path: '/trade-signal' }],
          "Trade new": [{ title: 'Trade new', path: '/open-trades' }],
          "Trade history": [{ title: 'Trade history', path: '/closed-trades' }]
        }
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: <FaUserAlt />,
      },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Trade History": [{ title: 'Trade History', path: '/trade-history' }],
          "Performance": [{ title: 'Performance', path: '/performance' }]
        }
      },
      {
        title: 'Log Out',
        path: '/logout',
        icon: <IoIosLogOut />,
      },

    );
  }


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
            <div className="sideNavLogo">
              <img src={logo} alt="" />
            </div>
            <p>BitWealthCapital</p>
          </div>
          <div className="sideNavMenu">
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  {menuItem.subNavOption ? (
                    <div>
                      <div className="topmenu"  style={{ backgroundImage: openSubMenuIndex === index ? 'background: #0400ff26' : 'none' }}>
                        <div className="topmenuItem">
                         <div className="topmenuIcon">
                         {menuItem.icon}
                         </div>
                         <div className="topmenuName">
                          {menuItem.title}
                         </div>
                        </div>
                        

                        {openSubMenuIndex === index ? (
                          <IoMdArrowDropdown onClick={() => toggleSubMenu(index)} />
                        ) : (
                          <IoMdArrowDropup onClick={() => toggleSubMenu(index)} />
                        )}
                      </div>

                      <ul className="submenu" style={{ display: openSubMenuIndex === index ? 'block' : 'none' }}>
                        {Object.keys(menuItem.subNavOption).map((subItemKey, subItemIndex) => (
                          <li key={subItemIndex}>
                            <ul className="submenu-subitems">
                              {menuItem.subNavOption && menuItem.subNavOption[subItemKey] && menuItem.subNavOption[subItemKey].map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <span>-</span> 
                                  <NavLink to={subItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="topmenu">
                      <div className="topmenuItem">
                         <div className="topmenuIcon">
                         {menuItem.icon}
                         </div>
                        
                      {/* {menuItem.icon} */}
                      <div className="topmenuName">
                          {/* {menuItem.title} */}
                          <NavLink to={menuItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        <span>{menuItem.title}</span>
                      </NavLink>
                      </div>
                      
                      
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default SideMenu