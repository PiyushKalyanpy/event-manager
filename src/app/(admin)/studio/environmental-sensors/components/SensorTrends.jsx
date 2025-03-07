'use client'

import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { Card, CardBody, CardHeader } from '@heroui/react'

const SensorTrends = ({ historicalData }) => {
    // Format timestamp for display
    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Format date for display
    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }
    console.log(historicalData)
    return (
        <Card className="col-span-2 bg-white/10">
            <CardHeader className="flex flex-col gap-2 items-start">
                <h4 className="text-2xl font-bold">Sensor Trends</h4>
                <p className="text-white/50 text-sm">
                    Historical sensor data over time
                </p>
            </CardHeader>
            <CardBody>
                <div className="h-[300px]">
                    {historicalData.length > 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                            {/* <AreaChart
                                data={historicalData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTemp"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#ef4444"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#ef4444"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorHum"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={formatTime}
                                    className="text-xs"
                                />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--background)',
                                        borderColor: 'var(--border)',
                                        borderRadius: '0.5rem',
                                    }}
                                    labelFormatter={(label) =>
                                        formatTime(label) +
                                        ' - ' +
                                        formatDate(label)
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey="temp"
                                    stroke="#ef4444"
                                    fillOpacity={1}
                                    fill="url(#colorTemp)"
                                    name="Temperature (°C)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="lpg"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorHum)"
                                    name="Humidity (%)"
                                />
                            </AreaChart> */}
                            <LineChart
                                width={500}
                                height={300}
                                data={historicalData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="temp"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="hum"
                                    stroke="#82ca9d"
                                />
                                 <Line
                                    type="monotone"
                                    dataKey="formaldehyde"
                                    stroke="#f44a22"
                                />

                                
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                    {/* <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historicalData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="stroke-muted"
                            />
                            <YAxis className="text-xs" />
                            <Area
                                type="monotone"
                                dataKey="temperature"
                                stroke="#ef4444"
                                fillOpacity={1}
                                fill="url(#colorTemp)"
                            />
                            <Area
                                type="monotone"
                                dataKey="humidity"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorHum)"
                            />
                        </AreaChart>
                    </ResponsiveContainer> */}
                </div>
            </CardBody>
        </Card>
    )
}

export default SensorTrends
