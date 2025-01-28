import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

interface AuthProviderProps {
    children: ReactNode;
  }
  
  interface AuthContextType {
    loggedIn: boolean;
    loginAuth: Function;
    logInUser: Function;
    logout: Function;
    setLoggedIn: Function;
    baseUrl: string;
    userId: string;
    email: string;
    token: string;
    userType: string;
    fullName: string;
    phoneNumber :  string;
  }
  
  const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    loginAuth: () => {},
    logInUser: () => {},
    logout: () => {},
    setLoggedIn: () => {},
    baseUrl: '',
    userId: '',
    email: '',
    token: '',
    userType: '',
    fullName: '',
    phoneNumber: '',
  });

  const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
   
    const [baseUrl] = useState<string>('http://127.0.0.1:8000/api/v1');
    const [email, setEmail] = useState<string>('');
    const [userType, setUserType] = useState<string>('');
    const [userId, setUserID] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
  
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
      const storedState = localStorage.getItem('myState');
      return storedState ? JSON.parse(storedState) : false;
    });
  
    const [token, setToken] = useState<string>(() => {
      const storedToken = localStorage.getItem('myToken');
      return storedToken ? storedToken : '';
    });

    const logInUser = () => {
      setLoggedIn(true);
      localStorage.setItem('myState', JSON.stringify(true));
    };
  
    const loginAuth = (userId: string, email: string, token: string, userType: string, fullName : string, phoneNumber : string) => {
      setUserID(userId);
      setEmail(email);
      setUserType(userType);
      localStorage.setItem('myToken', token);
      setToken(token);
      setFullName(fullName);
      setPhoneNumber(phoneNumber);
    }

    const logout = () => {
      navigate("/login");
    };

   useEffect(() => {
    const exemptedPaths = ['/register', '/', '/term', '/disclamer', '/forgetpassword', '/changepassword/:token', '/emailconfirm/:token', '/redirectform ', '/login'];
    const fetchData = async () => {
      if (loggedIn) {
        const storedToken: string | null = localStorage.getItem('myToken');
        const tokens: string = storedToken || '';
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", tokens);
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        try {
          const response = await fetch(`${baseUrl}/getuser`, requestOptions);
          const result = await response.json(); 
        
          if (response.ok) {
            loginAuth(result.data.userId, result.data.email, tokens, result.data.userRole, result.data.fullName, result.data.phoneNumber)
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        location.pathname
        if (!exemptedPaths.includes(location.pathname)) {
          logout()
        }
        
      }

    };

    fetchData();

  }, [loggedIn]);
  
    return (
      <AuthContext.Provider value={{ loggedIn, loginAuth, logInUser, logout, setLoggedIn,  baseUrl, userId, email, token, userType, fullName, phoneNumber }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const userAuth = (): AuthContextType => {
    return useContext(AuthContext);
  };

  export { AuthContext, AuthProvider };