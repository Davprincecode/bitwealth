import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
   const navigate = useNavigate();
   useEffect(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("myState");
      localStorage.removeItem("myToken");
      navigate("/");
   }, [navigate]);
   return null;
};

export default Logout;
