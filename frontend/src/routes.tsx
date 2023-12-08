import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages";

const  RoutesPath = createBrowserRouter([
    {
      path: "/",
      element:<Login/>
    },
  ]);

  export default RoutesPath;