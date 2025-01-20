// import { useState } from 'react';
import { Route, Routes} from "react-router-dom";
import './App.css'
import './AppCustom.css'
import 'react-multi-carousel/lib/styles.css';
import Blog from "./component/Blog";
import BlogDetails from "./component/BlogDetails";

import Homes from "./pages/inventory/Homes";
import Pos from "./pages/Pos/Pos";
import Table from "./pages/inventory/Table";
import Form from "./pages/inventory/Form";
import Tchart from "./pages/inventory/Tchart";
import PosDashboard from "./pages/Pos/PosDashboard";
import PRDashboard from "./pages/procuremnet/PRDashboard";
import MgDashboard from "./pages/manager/MgDashboard";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import SendProduct from "./pages/procuremnet/SendProduct";
import Modal from "./component/Modal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Expenses from "./pages/procuremnet/Expenses";
import AddExpenses from "./pages/procuremnet/AddExpenses";
import ShowExpenses from "./pages/procuremnet/ShowExpenses";
import PurchaseHistory from "./pages/procuremnet/PurchaseHistory";
import ShowPurchaseHistory from "./pages/procuremnet/ShowPurchaseHistory";
import Material from "./pages/manager/Material";
import ModalPos from "./component/ModalPos";
import Receipt from "./pages/Pos/Receipt";
import PosTransaction from "./pages/Pos/PosTransaction";
import PosCash from "./pages/Pos/PosCash";
import PosTransfer from "./pages/Pos/PosTransfer";
import PosSales from "./pages/Pos/PosSales";
import StaffList from "./pages/manager/StaffList";
import MgTransaction from "./pages/manager/MgTransaction";
import MgTransfer from "./pages/manager/MgTransfer";
import MgSales from "./pages/manager/MgSales";
import MgCash from "./pages/manager/MgCash";
import MyStock from "./pages/manager/MyStock";
import ShopExpenditure from "./pages/manager/ShopExpenditure";
import MyExpenditure from "./pages/manager/MyExpenditure";
import PurchaseStatus from "./pages/procuremnet/PurchaseStatus";
import Warehouse from "./pages/Warehouse/Warehouse";
import AddToStock from "./pages/Warehouse/AddToStock";
import MystockWarehouse from "./pages/Warehouse/MyStock";
import MyExpenditureWare from "./pages/Warehouse/MyExpenditure";
import IssuedHistory from "./pages/Warehouse/IssuedHistory";
import IssueProduct from "./pages/Warehouse/IssueProduct";
import MinorSales from "./pages/Warehouse/MinorSales";
import PosTest from "./pages/Pos/PosTest";
import ShowIssuedHistory from "./pages/Warehouse/ShowIssuedHistory";
import MinorSalesReport from "./pages/Warehouse/MinorSalesReport";
import IssueToShop from "./pages/Warehouse/IssueToShop";
import IssueToShopReport from "./pages/Warehouse/IssueToShopReport";
import AddWareHouseEXpenses from "./pages/Warehouse/AddWareHouseEXpenses";
import LandingPage from "./pages/LandingPage";
import PosUiDesign from "./pages/user/PosUiDesign";
import { userAuth } from "./pages/context/AuthContext";
import BinanceApi from "./pages/Binance";
import TermsAndConditions from "./TermAndCondition";
import Disclaimer from "./Disclamer";

function App() {
  const {baseUrl, token} = userAuth();
  let colorSwitch = "white";
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

    <Route path="/" element={<LandingPage />} />

    <Route path="/crypto" element={<BinanceApi />} />
    <Route path="/term" element={<TermsAndConditions />} />
    <Route path="/disclamer" element={<Disclaimer />} />
      

    <Route path="/login" element={<Login />} />


    <Route path="/logout" element={<Logout />} /> 

    <Route path="/dashboard" element={<PosUiDesign  />} />



    <Route path="/pos-dashboard" element={<PosDashboard  />} />

    <Route path="/pr-dashboard" element={<PRDashboard  />} />
    <Route path="/mg-dashboard" element={<MgDashboard  />} />
    <Route path="/sendproduct" element={<SendProduct  />} />

    <Route path="/expenses" element={<Expenses/>} />
    {/* <Route path="/addexpenses/:purchaseId" element={<AddExpenses/>} /> */}
    <Route path="/showexpenses/:purchaseId" element={<AddExpenses/>} />
    
    <Route path="/purchasehistory" element={<PurchaseHistory/>} />
    <Route path="/purchasestatus" element={<PurchaseStatus/>} />
    
    <Route path="/showpurchasehistory/:purchaseId" element={<ShowPurchaseHistory />} />
    <Route path="/material" element={<Material />} />
    <Route path="/users/:path" element={<StaffList />} />

   <Route path="/shopexpenditure" element={<ShopExpenditure />} />
   <Route path="/myexpenditure" element={<MyExpenditure />} />

    <Route path="/mg-transaction/:userId" element={<MgTransaction />} />
    <Route path="/mg-transfer/:userId" element={<MgTransfer />} />
    <Route path="/mg-sales/:userId" element={<MgSales />} />
    <Route path="/mg-cash/:userId" element={<MgCash />} />
    <Route path="/mystock" element={<MyStock />} />
    
    

    {/* /purchasehistory */}
    {/* /purchasestatus */}
    
 
    <Route path="/pos" element={<Pos />} />

    <Route path="/postest" element={<PosTest  />} />

    <Route path="/postransaction" element={<PosTransaction  />} />
    <Route path="/poscash" element={<PosCash  />} />
    <Route path="/postransfer" element={<PosTransfer  />} />
    <Route path="/possales" element={<PosSales  />} />

    <Route path="/warehouse-dashboard" element={<Warehouse />} />
    <Route path="/addtostock" element={<AddToStock />} />
    <Route path="/issueProduct" element={<IssueProduct />} />

    <Route path="/issueToShop" element={<IssueToShop />} />
    <Route path="/newexpenses" element={<AddWareHouseEXpenses />} />
    <Route path="/mystockwarehouse" element={<MystockWarehouse />} />
    <Route path="/myExpenditureWare" element={<MyExpenditureWare  />} />
    <Route path="/myIssuedHistory" element={<IssuedHistory />} />
    <Route path="/minorsales" element={<MinorSales />} />
    <Route path="/salesreport" element={<MinorSalesReport />} />
    <Route path="/shopreport" element={<IssueToShopReport />} />
    <Route path="/showIssuedhistory/:purchaseId" element={<ShowIssuedHistory />} />


        <Route path="/mart" element={<Homes  />} />
        
        <Route path="/table" element={<Table  />} />
        <Route path="/form" element={<Form  />} />
        <Route path="/chart" element={<Tchart  />} />

        
          
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetails/:blogId" element={<BlogDetails />} />
    </Routes>
    {/* <ContactBtn /> */}
    {/* <MapUi /> */}

    {/* <Footer/> */}
  </div>
  )
}

export default App
