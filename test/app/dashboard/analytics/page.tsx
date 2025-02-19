import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import { IndianRupee, Signal, Ticket, Users } from 'lucide-react'

import ActionBar from '../components/ActionBar'
import IconWithBorder from '@/components/shared/IconWithBorder'
import MainHeader from '../components/MainHeader'
import { RadialChart } from '@/components/charts/RadialChart'

const AnalyticsPage = () => {
    const headerRow = [
        {
            label: 'Total Events',
            value: '54',
            icon: <Ticket size={20} />,
            color: 'bg-green-600',
        },
        {
            label: 'Total Earnings',
            value: '3,675',
            icon: <IndianRupee size={20} />,
            color: 'bg-yellow-600',
        },
        {
            label: 'Total Registrations',
            value: '13,234',
            icon: <Signal size={20} />,
            color: 'bg-blue-600',
        },

        {
            label: 'Total Attendees',
            value: '10,234',
            icon: <Users size={20} />,
            color: 'bg-rose-600',
        },
    ]

    return (
        <div className=" w-full">
            <MainHeader label="Analytics" />
            <ActionBar />
            {/* main */}

            <div className="p-4 w-full">
                <div className=" grid grid-rows-3 grid-flow-col w-full gap-4">
                    {/* First Grid */}
                    <div className="grid grid-cols-12 gap-4 w-full">
                        {headerRow.map((row, index) => (
                            <InfoCard
                                key={index}
                                label={row.label}
                                value={row.value}
                                icon={row.icon}
                                color={row.color}
                                className="col-span-3"
                            />
                        ))}
                        <VerticalGraph
                            title="Total Events"
                            className="col-span-4 row-span-2 border w-full h-full rounded-3xl"
                        />
                        <Block className="col-span-4" />
                        <Block className="col-span-4" />
                        <Block className="col-span-4" />
                        <Block className="col-span-4" />
                        <Block className="col-span-3" />
                        <Block className="col-span-5" />
                        <Block className="col-span-2" />
                        <Block className="col-span-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const chartData = [
    { browser: 'safari', visitors: 1260, fill: 'var(--color-safari)' },
    // { browser: "chrome", visitors: 3450, fill: "var(--color-chrome)" },
]

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
}

const Block = ({ className }: any) => {
    return (
        <div
            className={`border w-full p-4    h-full  rounded-3xl  flex wrapper ${className}`}
        >
            <InfoCard />
        </div>
    )
}

const InfoCard = ({ color, label, value, icon, className }: any) => {
    return (
        <div
            className={`border w-full p-4  hover:scale-105 transition-all  h-full  rounded-3xl  flex wrapper ${className}`}
        >
            <div className="h-fit    ">
                <div className="flex items-center  gap-3">
                    <IconWithBorder
                        className={`${color} w-fit rounded-lg" `}
                        icon={icon}
                    />
                    <p>{label}</p>
                </div>

                <div className="flex items-center  gap-3">
                    <p className="text-4xl font-bold mt-8">{value}</p>
                </div>

                {/* increase  */}
                {/* <div className="flex items-center  gap-3  text-green-600 content-center   ">
                    <Image
                        src="/increase.svg"
                        width={50}
                        height={50}
                        className="w-8 h-8 "
                        alt="logo"
                    />
                    <p className="text-md font-bold  p-4">2.4%</p>
                </div> */}
            </div>
        </div>
    )
}

const VerticalGraph = ({
    data,
    label,
    color,
    title,
    width = 400,
    height = 300,
    className = '',
}: any) => {
    return (
        <RadialChart
            className={className}
            data={chartData}
            config={chartConfig}
        />
    )
}

export default AnalyticsPage
