// import { useState } from 'react';
import { Route, Routes} from "react-router-dom";
import './App.css'
import './AppCustom.css'
import 'react-multi-carousel/lib/styles.css';
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./pages/LandingPage";
import { userAuth } from "./pages/context/AuthContext";
import BinanceApi from "./pages/Binance";
import TermsAndConditions from "./TermAndCondition";
import Disclaimer from "./Disclamer";
import { useEffect, useState } from "react";
import SignalForm from "./SignalForm";
import Register from "./pages/Auth/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import RedirectForm from "./pages/Auth/RedirectForm";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Hedge from "./pages/hedge/Hedge";
import TradeDashboard from "./pages/tradeclub/TradeDashboard";
import CreateSignal from "./pages/admin/CreateSignal";
import SendEmail from "./pages/admin/SendEmail";
import KycUser from "./pages/admin/KycUser";
import TradingHistory from "./pages/admin/TradingHistory";
import AllUser from "./pages/admin/AllUser";
import Profile from "./pages/tradeclub/Profile";
import EditProfile from "./pages/tradeclub/EditProfile";
import KycVerification from "./pages/tradeclub/KycVerifcation";
import PaymentStatus from "./pages/tradeclub/PaymentStatus";
import UserTradeHistory from "./pages/tradeclub/UserTradeHistory";
import UserPerformance from "./pages/tradeclub/UserPerformance";
import UserTradeSignal from "./pages/tradeclub/UserTradeSignal";
import TradeNews from "./pages/tradeclub/TradeNews";
import CryptoNews from "./pages/admin/CrytoNew";
import TradeHistories from "./pages/admin/TradeHistries";
import PendingKyc from "./pages/admin/PendingKyc";
import PaymentPending from "./pages/admin/PaymentPending";
import Dashboard from "./pages/Dashboard";
import BinanceAccountInfo from "./pages/Binance/BinanceAccountInfo";
import BinanceLib from "./pages/Binance/BinanceLib";

import tradingViewNews from './pages/tradingViewNews'
import TradingViewNews from "./pages/tradingViewNews";
import CryptoPrice from "./pages/CryptoPrice";
import UserList from "./pages/admin/UserList";
import Refferal from "./pages/tradeclub/Refferal";
import RejectedUser from "./pages/admin/RejectedUser";
import ResourcesIframe from "./ResourcesIframe";
import ResourcesIframeLocal from "./ResourcesIframeLocal";
import ResourcesIframe2 from "./ResourcesIframe2";
import RefferalDetails from "./pages/admin/RefferalDetails";
import PageResources from "./PageResources";
import TradeUserList from "./pages/admin/TradeUserList";
import UserWalletTradeHistory from "./pages/admin/userTrade/UserWalletTradeHistory";
import FutureTrade from "./pages/admin/userTrade/FutureTrade";
import SpotTrade from "./pages/admin/userTrade/SpotTrade";
import DepositTrade from "./pages/admin/userTrade/DepositTrade";
import WithdrawTrade from "./pages/admin/userTrade/WithdrawTrade";
import FutureTradeHistory from "./pages/admin/userTrade/FutureTradeHistory";
import OpenPosition from "./pages/admin/userTrade/OpenPosition";




function App() {
  const {color} = userAuth();
  let userColor = color ? color : "white";
  const [colorSwitch, setColorSwitch] = useState(userColor);
  useEffect(() => {
    setColorSwitch(userColor);
  }, [userColor]);
 const colorSwitchFunction = () => {
  
  if(colorSwitch == "white"){
    setColorSwitch("black");
  }
  if(colorSwitch == "black"){
    setColorSwitch("white");
  }
 }

  return (
    <div className={colorSwitch === "white" ? "bodyappwhite" : "bodyappblack"}>

<ToastContainer 
   position="top-right"
   autoClose={3000} 
   hideProgressBar={false}
   closeOnClick
   pauseOnHover
   draggable
   theme="colored"
   />
   

    <Routes>

    <Route path="/" element={<LandingPage  colorSwitchFunction={colorSwitchFunction} colorSwitch={colorSwitch} />} />


    <Route path="/binance" element={<BinanceAccountInfo />} />
    <Route path="/binancelib" element={<BinanceLib />} />


    <Route path="/crypto" element={<BinanceApi />} />

    <Route path="/term" element={<TermsAndConditions />} />
    <Route path="/page_resources" element={<PageResources />} />

    <Route path="/disclamer" element={<Disclaimer />} />
    <Route path="/signal" element={<SignalForm />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/register/:refferalId" element={<Register />} />
    <Route path="/redirectform" element={<RedirectForm />} />
    <Route path="/emailconfirm/:token" element={<ConfirmEmail/>} />
    <Route path="/forgetpassword" element={<ForgetPassword/>} />
    <Route path="/changepassword/:token" element={<ChangePassword/>} />

    {/* ============= admin ============= */}
    <Route path="/admin-dashboard" element={<AdminDashboard  />} />
    <Route path="/create-signal" element={<CreateSignal />} />
    <Route path="/send-email" element={<SendEmail />} />
    <Route path="/kyc" element={<KycUser />} />
    <Route path="/all-signal" element={<TradingHistory />} />
    <Route path="/all-users" element={<AllUser />} />
{/* =========================== */}
    {/* trade history */}
    <Route path="/user-list" element={<TradeUserList />} />
    <Route path="/user-trade-history/:userId" element={<UserWalletTradeHistory />} />
    <Route path="/future-history/:userId" element={<FutureTrade />} />
    <Route path="/spot-history/:userId" element={<SpotTrade/>} />
    <Route path="/deposit-history/:userId" element={<DepositTrade/>} />
    <Route path="/withdraw-history/:userId" element={<WithdrawTrade/>} />



    <Route path="/viewrefferal/:refferalId" element={<RefferalDetails />} />
    <Route path="/rejected-users" element={<RejectedUser />} />
    <Route path="/crypto-news" element={<CryptoNews />} />
    <Route path="/pendingkyc" element={<PendingKyc />} />
    <Route path="/pendingpayments" element={<PaymentPending />} />
    <Route path="/refferals" element={<Refferal />} />



    <Route path="/userlist" element={<UserList />} />



    <Route path="/dashboard" element={<Dashboard />} />

    {/* ============ admin end ============= */}

{/* =============== trade club =============== */}
<Route path="/user-trade-signal" element={<UserTradeSignal />} />
<Route path="/trade-news" element={<TradeNews />} />
<Route path="/trade-dashboard" element={<TradeDashboard />} />
<Route path="/profile" element={<Profile />} />
<Route path="/editprofile" element={<EditProfile />} />
<Route path="/kycverification" element={<KycVerification />} />
<Route path="/subscriptionpayment" element={<PaymentStatus />} />
<Route path="/user-trade-history" element={<UserTradeHistory />} />
<Route path="/performance" element={<UserPerformance />} />


<Route path="/resource" element={<ResourcesIframeLocal />} />
<Route path="/resource2" element={<ResourcesIframe2 />} />



<Route path="/resourceframe" element={< ResourcesIframe/>} />




{/* <Route path="/tradeview" element={<TradingViewNews />} />
 */}

<Route path="/cryptoprice" element={<CryptoPrice />} />
{/* ============= trade club end ============== */}


{/* ============ hedge ============= */}
<Route path="/hedge-dashboard" element={<Hedge  />} />
{/* ============ hedge end ============== */}





        
        
    </Routes>
    {/* <ContactBtn /> */}
    {/* <MapUi /> */}

    {/* <Footer/> */}
  </div>
  )
}

export default App
