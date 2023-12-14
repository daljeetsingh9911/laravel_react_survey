import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CreateSurvey, Home, Login,Registration,Surveys } from "./pages";
import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/dashboard";
import { MyContext } from "./context/surveyContext";


const  App = () => {
   
  let navigate = useNavigate();
  let {userToken} = useContext(MyContext);
  let localToken =  localStorage.getItem("userToken");

   // use effect if the page have not any base url
  useEffect(() => {
      if(!localToken || window.location.pathname == '/'){
          navigate('/login');
      }
  },[]);

  // use effect for redirect user get logged in
  useEffect(() => {
   checkTokenAndredirectUser();
  }, [userToken]);

  const checkTokenAndredirectUser =()=> {
   if(userToken || localToken){
      navigate(window.location.pathname);
   }
  } 

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
