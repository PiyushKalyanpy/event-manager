'use client'

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from 'recharts'

import { ChartContainer } from '@/components/ui/chart'

interface ChartProps {
    className?: string
    data: Array<{ browser: string; visitors: number; fill: string }>
    config: {
        [key: string]: {
            label: string
            color?: string
        }
    }
}

export function RadialChart({ className, data, config }: ChartProps) {
    return (
        <ChartContainer
            config={config}
            className={`${className} mx-auto aspect-square max-h-[250px]`}
        >
            <RadialBarChart
                data={data}
                endAngle={100}
                innerRadius={80}
                outerRadius={140}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-4xl font-bold"
                                        >
                                            {data[0]?.visitors?.toLocaleString() ||
                                                '0'}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            {config[data[0]?.browser]?.label ||
                                                'Data'}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    )
}
