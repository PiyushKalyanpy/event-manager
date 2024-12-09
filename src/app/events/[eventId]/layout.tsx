'use client'


const EventLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="full-page">
            {children}
        </div>
    )
}

export default EventLayout
