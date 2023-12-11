import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AuthLayout from "./layouts/auth";
import { CreateSurvey, Home, Login,Registration,Surveys } from "./pages";

import DashboardLayout from "./layouts/dashboard";


const  App = () => {
   
  let navigate = useNavigate();

  useEffect(() => {
      let localToken =  localStorage.getItem("userToken");
      
      if(!localToken || window.location.pathname == '/'){
          navigate('/login');
      }
      
  }, []);
    
  return (
   <div>
      <Routes>
         <Route path="/" element={<AuthLayout/>}>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
         </Route>
         <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="surveys/create" element={<CreateSurvey />} />  
         </Route>
      </Routes>
   </div>
  )
}

export default App
