import { useContext, useEffect } from "react";
import { MyContext, MyContextProps } from "./surveyContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import { Login } from "./pages";
import DashboardLayout from "./layouts/dashboard";




const  App = () => {
  const {userToken} =  useContext<MyContextProps>(MyContext);
  let navigate = useNavigate();

  useEffect(() => {
      if(!userToken){
          navigate('/auth/login');
      }
  }, []);
    
  return (
   <div>
      <Routes>
         <Route  path="/" element={<DashboardLayout/>}>
            <Route 
              path="/Home" element={<Login/>}
              />
         </Route>
         <Route  path="/auth" element={<AuthLayout/>}>
            <Route 
              path="login" element={<Login/>}
              />
         </Route>
      </Routes>
   </div>
  )
}

export default App
