import React from 'react'

const StatsComponent: React.FC = () => {
    const stats = [
        { value: '10,000+', label: 'Events Managed' },
        { value: '100+', label: 'Countries Served' },
        { value: '1 Million+', label: 'Attendees Engaged' },
        { value: '99.9%', label: 'System Uptime' },
    ]

    return (
        <div className="flex w-screen overflow-hidden h-fit p-8 bg-neutral-800/50 items-center justify-center">
            <div className="bg-dark-gradient p-8 rounded-lg flex justify-between items-center text-white  gap-8 flex-col md:flex-row  ">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex   items-center p-4  gap-24"
                    >
                        <div className="text-center w-fit items-center  flex gap-4 flex-col ">
                            <h3 className="text-3xl text-center font-bold">
                                {stat.value}
                            </h3>
                            <p className="text-sm mt-2 opacity-75">
                                {stat.label}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            {index !== stats.length - 1 && <Divider />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Divider = () => {
    return (
        <div className="w-full hidden  h-16 md:flex items-center justify-center flex-col">
            <div className="h-full  border-dashed border-green-800 border-1 w-[0.5]" />
            <div className="h-2 bg-green-800  rounded-full w-2" />
        </div>
    )
}

export default StatsComponent
