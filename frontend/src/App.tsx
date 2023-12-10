import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { MyContext, MyContextProps } from "./surveyContext";
import AuthLayout from "./layouts/auth";
import { Home, Login } from "./pages";
import DashboardLayout from "./layouts/dashboard";


const  App = () => {
  const {userToken} =  useContext<MyContextProps>(MyContext);
  let navigate = useNavigate();

  useEffect(() => {
      if(!userToken){
          navigate('/login');
      }

  }, []);
    
  return (
   <div>
      <Routes >
         <Route  path="/" element={<AuthLayout/>}>
            <Route 
              path="login" element={<Login/>}
              />
         </Route>
         <Route  path="dashbord" element={<DashboardLayout/>}>
            <Route 
              path="home" element={<Home/>}
              />
         </Route>
         
      </Routes>
   </div>
  )
}

export default App
