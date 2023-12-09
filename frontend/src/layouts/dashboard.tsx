import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/header";

const DashboardLayout = () => {
    return(
        <div  >
            <ResponsiveAppBar/>
            <Outlet/>
        </div>
    )
}

export default DashboardLayout;