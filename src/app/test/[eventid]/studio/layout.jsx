import StudioSidebar from '@/components/sidebar/StudioSidebar'

const StudioLayout = ({ children }) => {
    return (
        <div className="w-screen flex min-h-screen ">
            <div className="w-1/5 border  flex ">
                <MainSidebar />
            </div>
            <div className="w-3/4 flex ">{children}</div>
        </div>
    )
}

export default StudioLayout
