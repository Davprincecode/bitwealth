import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
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
  [key: string]: { title: string; path: string; }[];
}

interface MenuItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  subNavOption?: SubNavOptions;
}

const SideMenu: React.FC<Props> = ({ navBar, handleToggle }) => {

  const { userType } = userAuth();

  const role = userType;

  const menuItems: MenuItem[] = [];

  if (role === 'admin') {
    menuItems.push(
      {
        title: 'Dashboard',
        path: '/admin-dashboard',
        icon: <RiHome2Fill />
      },
      {
        title: 'Trade Signal',
        path: '/#',
        icon: <IoIosSettings />,
        subNavOption: {
          "Create Signals": [{ title: 'Create Signal', path: '/create-signal' }],
          "Signals": [{ title: 'Signals', path: '/signal' }],
          "Trade Signals": [{ title: 'Signals', path: '/signal' }]
        }
      },

      {
        title: 'admin Application',
        path: '/#',
        icon: <IoIosSettings />,
        subNavOption: {
          "admin mat": [{ title: 'Material Recieve', path: '/material' }],
          "Expenditure": [{ title: 'Expenditure', path: '/shopexpenditure' }]
        }
      },
      {
        title: 'trade history',
        path: '/#',
        icon: <IoIosSettings />,
        subNavOption: {
          "admin mat": [{ title: 'Material Recieve', path: '/material' }],
          "Expenditure": [{ title: 'Expenditure', path: '/shopexpenditure' }]
        }
      },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Transaction": [{ title: 'Transaction', path: '/users/mg-transaction' }],
          "Sales": [{ title: 'Sales', path: '/users/mg-sales' }],
          "Currency (cash)": [{ title: 'Currency (cash)', path: '/users/mg-cash' }],
          "E-Money (transfer or pos)": [{ title: 'E-Money (transfer or pos)', path: '/users/mg-transfer' }]
        }
      },
      {
        title: 'My Inventory',
        path: '/#',
        icon: <MdInventory />,
        subNavOption: {
          "My Warehouse": [{ title: 'My Warehouse', path: '/myStock' }],
          "My Expenses": [{ title: 'My Expenses', path: '/myexpenditure' }]
        }
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
        title: 'My Trades',
        path: '/#',
        icon: <IoIosSettings />,
        subNavOption: {
          "Open Trades": [{ title: 'Open Trades', path: '/open-trades' }],
          "Closed Trades": [{ title: 'Closed Trades', path: '/closed-trades' }]
        }
      },
      {
        title: 'Report',
        path: '/#',
        icon: <LuFileBarChart />,
        subNavOption: {
          "Trade History": [{ title: 'Trade History', path: '/trade-history' }],
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
          <div className="sideNavLogoContainer">
            <div className="sideNavLogo">
              <img src={logo} alt="" />
            </div>
            <p>BitWealthCapital</p>
          </div>
          <div className="sideNavMenu">
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index} style={{ backgroundImage: openSubMenuIndex === index ? 'linear-gradient(135deg,#eb232d,#de8b2d)' : 'none' }}>
                  {menuItem.subNavOption ? (
                    <div>
                      <div className="topmenu">
                        {menuItem.icon}
                        <span>{menuItem.title}</span>
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
      );
}

export default SideMenu