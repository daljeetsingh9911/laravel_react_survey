import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/header";

const DashboardLayout = () => {

    return(
        <div className="h-full- w-full overflow-y " >
            <ResponsiveAppBar/>
            <div className="p-5">
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayout;