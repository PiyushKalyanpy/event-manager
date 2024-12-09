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
            <div className="bg-dark-gradient p-8 rounded-lg flex justify-between items-center text-white space-x-8">
                {stats.map((stat, index) => (
                    <div key={index} className='flex  items-center gap-24'>
                        <div className="text-center flex gap-4 flex-col ">
                            <h3 className="text-3xl font-bold">{stat.value}</h3>
                            <p className="text-sm mt-2 opacity-75">
                                {stat.label}
                            </p>
                        </div>
                            <div>
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
        <div className="w-full  h-16 flex items-center justify-center flex-col">
            <div className="h-full  border-dashed border-green-800 border-1 w-[0.5]" />
            <div className="h-2 bg-green-800  rounded-full w-2" />
        </div>
    )
}

export default StatsComponent
