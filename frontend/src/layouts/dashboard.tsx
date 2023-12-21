import ResponsiveAppBar from "../components/header";

const DashboardLayout = ({children}:any) => {

    return(
        <div className="h-full-vh">
            <ResponsiveAppBar/>
            <div className="container pt-5 pb-5">
               {children}
            </div>
        </div>
    )
}

export default DashboardLayout;