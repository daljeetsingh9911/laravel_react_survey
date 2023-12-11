import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/header";

const DashboardLayout = () => {

    return(
        <div className="h-full-vh w-full overflow-y " >
            <ResponsiveAppBar/>
            <Outlet/>
        </div>
    )
}

export default DashboardLayout;