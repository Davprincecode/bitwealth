import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FiX } from 'react-icons/fi';
import { RiHome2Fill } from "react-icons/ri";
import { LuFileBarChart } from "react-icons/lu";
import { MdInventory, MdNetworkWifi } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoIosLogOut, IoIosSettings, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import navPreloader from '../assets/images/navloading1.gif';
import { userAuth } from '../pages/context/AuthContext';
import { FaBookReader, FaChartLine, FaUserAlt, FaUsers } from 'react-icons/fa';
import { FcComboChart } from 'react-icons/fc';
import { IoLogOut } from 'react-icons/io5';
// import { FaUsers } from "react-icons/fa";
import { toast } from 'react-toastify';


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
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {baseUrl, token, role, paymentStatus} = userAuth();  

  const logOut = async () => {
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
      const response = await fetch(`${baseUrl}/logout`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const result = await response.json(); 
      
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      localStorage.removeItem("myState");
      localStorage.removeItem("myToken");
      toast.success("You are now logged out...");
       setLoading(false); 
       navigate("/login");
      
    } catch (error) {
        setLoading(false);
        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred.');
        }
      }
  
 };


const handleSub = (path: string) => {
  const paths = path == "/user-trade-signal" ? "trade signals" : "resources";
  toast.error(`To access ${paths}, subscribe in your profile.`);
}

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
          "Rejected Users": [{ title: 'Rejected Users', path: '/rejected-users' }],
          "Pending Kyc": [{ title: 'pending kyc', path: '/pendingkyc' }],
          "Pending Payments": [{ title: 'Pending Payments', path: '/pendingpayments' }],
          "Email": [{ title: 'send email', path: '/send-email' }],
        }
      },
      {
        title: 'Trade Signal',
        path: '/#',
        icon: <FaChartLine />,
        subNavOption: {
          "Create Signals": [{ title: 'Create Signal', path: '/create-signal' }],
          "All Signals": [{ title: 'All Signals', path: '/all-signal' }],
        }
      },
 
      
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Api Feedback": [{ title: 'Api Feedback', path: '/user-list' }],
          "Crypto News": [{ title: 'Crypto News', path: '/crypto-news' }]
        }
      }
    );
  } else if (role === 'trade club') {
    menuItems.push(
      {
        title: 'Dashboard',
        path: '/trade-dashboard',
        icon: <RiHome2Fill />
      },

      // {
      //   title: 'Trade signal',
      //   path: '/#',
      //   icon: <IoIosSettings />,
      //   subNavOption: {
      //     "Trade Signals": [{ title: 'Trade Signals', path: '/user-trade-signal' }],

      //     "Trade new": [{ title: 'Trade new', path: '/trade-news' }]
      //   }
      // },
      {
        title: 'Trade Signals',
        path: '/user-trade-signal',
        icon: <MdNetworkWifi />,
      },
      {
        title: 'Resources',
        path: '/resource',
        icon: <FaBookReader />,
      },
      {
        title: 'Trade news',
        path: '/trade-news',
        icon: <IoIosSettings />,
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: <FaUserAlt />,
      },
      {
        title: 'Referral',
        path: '/refferals',
        icon: <FaUsers />,
      },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Trade History": [{ title: 'Trade History', path: '/user-trade-history' }],
          "Performance": [{ title: 'Performance', path: '/performance' }]
        }
      }

    );
  } else if (role === 'hedge fund'){
    menuItems.push(
      {
        title: 'Dashboard',
        path: '/hedge-dashboard',
        icon: <RiHome2Fill />
      },
      {
        title: 'Resources',
        path: '/resource',
        icon: <FaBookReader />,
      },
      {
        title: 'Trade news',
        path: '/trade-news',
        icon: <IoIosSettings />,
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: <FaUserAlt />,
      },
      {
        title: 'Referral',
        path: '/refferals',
        icon: <FaUsers />,
      },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Trade History": [{ title: 'Trade History', path: '/user-trade-history' }],
          "Performance": [{ title: 'Performance', path: '/performance' }]
        }
      }
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
           <NavLink to="/">
          <div className="sideNavLogoContainer">
            <div className="sideNavLogo">
              <img src={logo} alt="" />
            </div>
            <p>BitWealthCapital</p>
          </div>
          </NavLink>

          <div className="sideNavMenu">

              {
          role == "" || loading ? (
            <div className="sideNavPreloader">
            <img src={navPreloader} alt="preloader" />
           </div>
          ) : (
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>

                  {menuItem.subNavOption ? (
                    <div>
                      <div className="topmenu"  style={{ backgroundImage: openSubMenuIndex === index ? 'background: #0400ff26' : 'none' }}    onClick={() => toggleSubMenu(index)} >
                        <div className="topmenuItem">
                         <div className="topmenuIcon">
                         {menuItem.icon}
                         </div>
                         <div className="topmenuName">
                          {menuItem.title}
                         </div>
                        </div>
                        

                        {openSubMenuIndex === index ? (
                          <IoMdArrowDropdown />
                        ) : (
                          <IoMdArrowDropup />
                        )}
                      </div>

                      <ul className="submenu" style={{ display: openSubMenuIndex === index ? 'block' : 'none' }}>
                        {Object.keys(menuItem.subNavOption).map((subItemKey, subItemIndex) => (
                          <li key={subItemIndex}>
                            <ul className="submenu-subitems">
                              {menuItem.subNavOption && menuItem.subNavOption[subItemKey] && menuItem.subNavOption[subItemKey].map((subItem, subIndex) => (
                                  subItem.path === "/user-trade-signal" || subItem.path === "/resource" ? (
                                    paymentStatus === "approved" ? (
                                      <li key={subIndex}>
                                      <span>-</span>
                                          <NavLink to={subItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                            <span>{subItem.title}</span>
                                          </NavLink>
                                        </li>
                                    ) : (
                                      <li key={subIndex} onClick={() =>handleSub(subItem.path)}>
                                      <span>-</span>
                                            <span>{subItem.title}</span>
                                        </li>
                                    )
                                        
                                  ) : (
                                    <li key={subIndex}>
                                    <span>-</span>
                                    <NavLink to={subItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                      <span>{subItem.title}</span>
                                    </NavLink>
                                  </li>
                                  )
                                 
                                

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
                      <div className="topmenuName">
                           {    menuItem.path === "/user-trade-signal" || menuItem.path === "/resource" ? (
                                    paymentStatus === "approved" ? (
                                      <NavLink to={menuItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                        <span>{menuItem.title}</span>
                                        </NavLink>
                                    ):(
                                       <div onClick={() => handleSub(menuItem.path)}>
                                        <span>{menuItem.title}</span>
                                        </div>
                                    )
                                    
                                    ) : (
                                        <NavLink to={menuItem.path} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                        <span>{menuItem.title}</span>
                                        </NavLink>
                                    )
                                  }
                      </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              <li>
                <div className="topmenu">

                  <div className="topmenuItem" onClick={logOut}>
                    <div className="topmenuIcon">
                    <IoIosLogOut />
                    </div>
                    <div className="topmenuName">
                    Log Out
                    </div>
                  </div>
                  
                </div>
             
              </li>

            </ul>
          )  
          }

          </div>

        </div>
      );
}

export default SideMenu