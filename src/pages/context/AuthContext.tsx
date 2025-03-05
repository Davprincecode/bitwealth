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
    setEmail: Function;
    setPhoneNumber: Function; 
    setDob: Function; 
    setMembership: Function; 
    setCountry: Function; 
    setFullName: Function;
    setSurName: Function;
    setOtherName: Function;
    setImage_url: Function;
   setRefferalId: Function;
    baseUrl: string; 
    userId : string;
    email : string;
    fullName : string;
    surName : string;
    otherName : string;
    phoneNumber : string;
    country : string;
    dob : string;
    membership : string;
    kycStatus : string;
    paymentStatus : string;
    image_url : string;
    role : string;
    refferalId : string;
    token: string;
  }
  
  const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    loginAuth: () => {},
    logInUser: () => {},
    logout: () => {},
    setLoggedIn: () => {},
    setEmail: () => {},
    setPhoneNumber:  () => {}, 
    setDob:  () => {}, 
    setMembership:  () => {}, 
    setCountry:  () => {}, 
    setFullName:  () => {},
    setSurName:  () => {},
    setOtherName:  () => {},
    setImage_url:  () => {},
   setRefferalId:  () => {},
    baseUrl: '',
    userId : '',
    email : '',
    fullName : '',
    surName : '',
    otherName : '',
    phoneNumber : '',
    country : '',
    dob : '',
    membership : '',
    kycStatus : '',
    paymentStatus : '',
    role : '',
    refferalId : '',
    image_url : '',
    token: '',
  });

  const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
   
    // const [baseUrl] = useState<string>('http://127.0.0.1:8000/api/v1');
    const [baseUrl] = useState<string>('https://apis.bitwealthcapital.org/api/v1');
  
    const [userId, setUserID] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [membership, setMembership] = useState<string>('');
    const [kycStatus, setKycStatus] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string>('');
    const [image_url, setImage_url] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [surName, setSurName] = useState<string>('');
    const [otherName, setOtherName] = useState<string>('');
    const [refferalId, setRefferalId] = useState<string>('');
   
     const [token, setToken] = useState<string>(() => {
      const storedToken = localStorage.getItem('myToken');
      return storedToken ? storedToken : '';
    });   
  
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
      const storedState = localStorage.getItem('myState');
      return storedState ? JSON.parse(storedState) : false;
    });
  
    const logInUser = () => {
      setLoggedIn(true);
      localStorage.setItem('myState', JSON.stringify(true));
    };
  
    const loginAuth = (userId: string, email: string, fullName : string, surName : string, otherName : string, phoneNumber : string, country: string, dob: string, membership:string, kycStatus:string, paymentStatus:string, image_url: string, role : string, refferalId:string,  token?: string) => {
      setRole(role);
      setUserID(userId);
      setEmail(email);
      setFullName(fullName);
      setSurName(surName);
      setOtherName(otherName);
      setPhoneNumber(phoneNumber);
      setCountry(country);
      setDob(dob);
      setMembership(membership);
      setKycStatus(kycStatus);
      setPaymentStatus(paymentStatus);
      setImage_url(image_url);
     setRefferalId(refferalId);
      if(token){
          localStorage.setItem('myToken', token);
          setToken(token);
      }
      
    }

    const logout = () => {
      localStorage.removeItem("myState");
      localStorage.removeItem("myToken");
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
         
          if(response.ok){
            loginAuth(result.data.userId, result.data.email, result.data.fullName, result.data.surName, result.data.otherName, result.data.phoneNumber, result.data.country, result.data.dob, result.data.membership, result.data.kycStatus, result.data.paymentStatus, result.data.image_url, result.data.userRole, result.data.refferalId);
          }
        } catch (error) {
          console.log(error);
          location.pathname
          if (!exemptedPaths.includes(location.pathname)) {
            logout()
          }
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
      <AuthContext.Provider value={{ loggedIn, loginAuth, logInUser, logout, setLoggedIn,  baseUrl, userId, email, fullName, surName, otherName, phoneNumber, country, dob, membership, kycStatus, paymentStatus, image_url, refferalId, role, token, setEmail, setPhoneNumber, setDob, setMembership, setCountry, setFullName, setSurName, setOtherName, setImage_url,setRefferalId
      }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const userAuth = (): AuthContextType => {
    return useContext(AuthContext);
  };

  export { AuthContext, AuthProvider };