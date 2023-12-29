import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CreateSurvey, Home, Login,Questions,Registration,Surveys } from "./pages";
import AuthLayout from "./layouts/auth";
import { MyContext } from "./context/surveyContext";


const  App = () => {
   
  let navigate = useNavigate();
  let {userToken} = useContext(MyContext);
  let localToken =  localStorage.getItem("userToken");

   // use effect if the page have not any base url
  useEffect(() => {
   let path =  window.location.pathname;
   
      if((!localToken || path == '/' ) && (!path.split('/').includes('public'))){
          navigate('/login');
      }
      checkTokenAndredirectUser();
  },[]);

  // use effect for redirect user get logged in
  useEffect(() => {
   checkTokenAndredirectUser();
  }, [userToken]);

  const checkTokenAndredirectUser =()=> {
   if(userToken || localToken){
      if(window.location.pathname == '/login'){
         navigate('/home');
      }else{
         navigate(window.location.pathname);
      }
   }
  } 

  return (
   <div>
      <Routes>
         <Route path="/" element={<AuthLayout/>}>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="public/:slug" element={<Questions />} />
         </Route>
         <Route path="home" element={<Home />} />
         <Route path="surveys" element={<Surveys />} />
         <Route path="surveys/edit/:id?" element={<CreateSurvey />} />
         <Route path="surveys/create" element={<CreateSurvey />} />  
      </Routes>
   </div>
  )
}

export default App
