import MainSidebar from "@/components/sidebar/MainSidebar"

const DashboardLayout = ({ children }) => {
    return (
        <div className="w-screen flex min-h-screen ">
            {/* sidebar */}
            <div className="w-1/5 border  flex ">
            <MainSidebar/>
            </div>
            {/* content */}
            <div className="w-3/4 flex ">{children}</div>
        </div>
    )
}

export default DashboardLayout
