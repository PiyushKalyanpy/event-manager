'use client'

import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react'
import { Cell, Label, Pie, PieChart } from 'recharts'

const GaugeCard = ({ title, data, minValue, maxValue, icon, value }) => {
    console.log(data)
     return (
        <Card className="bg-white/10 h-fit">
            <CardHeader className="flex w-full justify-between items-center">
                <h4>{title}</h4>
                {icon}
            </CardHeader>
            <CardBody className="flex items-center justify-center">
                <PieChart width={130} height={130}>
                    <Pie
                        data={data}
                        cx={65}
                        cy={65}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={45}
                        outerRadius={60}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Label
                            position={'center'}
                            className="text-2xl font-bold text-white "
                            color="white"
                        >
                            {value && value}
                        </Label>
                    </Pie>
                </PieChart>
            </CardBody>
            <Divider className="border-white/10" />
            <CardFooter className="flex w-full justify-between items-center text-sm text-white/60">
                <p>Min: {minValue}</p>
                <p>Max: {maxValue}</p>
            </CardFooter>
        </Card>
    )
}
export default GaugeCard
