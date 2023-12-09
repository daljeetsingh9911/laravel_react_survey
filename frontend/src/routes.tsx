import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/dashboard";


const  RoutesPath = createBrowserRouter([
    {
      path: "auth",
      element:<AuthLayout/>,
      children:[
        {
          path:"login",
          element:<Login/>
        }
      ]
    },
    {
      path: "/",
      element:<DashboardLayout/>,
      children:[
        {
          path:"home",
          element:<Login/>
        }
      ]
    },
  ]);

export default RoutesPath;