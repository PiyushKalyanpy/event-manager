'use client'

import { Button, Switch } from '@heroui/react'
import { Card, CardHeader } from '@heroui/card'
import { Droplets, Flame, FlaskRound, Thermometer, Wind } from 'lucide-react'

import GaugeCard from './components/GaugeCard'
import Indicator from './components/Indicator'
import SensorTrends from './components/SensorTrends'
import { createGaugeData } from '@/services'
import { useSensor } from '@/hooks/useSensor'
import { useState } from 'react'

const EnvironmentalSensor = () => {
    const {
        switchState,
        toggleSwitch,
        rangeData,
        clientId,
        currentState,
        sendMessage,
        sensorData,
    } = useSensor()

    // if (sensorData.length > 0) {
    //      try {
    //         console.log(JSON.parse(sensorData[3].value.slice(1)))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const generateMockData = () => {
        return {
            temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
            humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
            co: Math.floor(Math.random() * 30) + 5, // 5-35 ppm
            formaldehyde: (Math.random() * 0.5 + 0.05).toFixed(2), // 0.05-0.55 ppm
            lpg: Math.floor(Math.random() * 1000) + 200, // 200-1200 ppm
            timestamp: new Date().toISOString(),
        }
    }
    const generateHistoricalData = () => {
        const data = []
        const now = new Date()

        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000)
            data.push({
                ...generateMockData(),
                timestamp: time.toISOString(),
            })
        }

        return data
    }

    const [historicalData, setHistoricalData] = useState(
        generateHistoricalData()
    )
    console.log(historicalData  )   

    console.log(sensorData)

    return (
        <div className="p-4 w-full flex gap-6 flex-col h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Environmental Sensor</h2>
                <div className="flex gap-2 items-center">
                    {currentState.message}

                    <Indicator value={currentState} />

                    <Switch
                        isSelected={currentState.state == "true" ? true : false}
                        onValueChange={(e) => {
                            if (currentState.state != e) {
                                toggleSwitch()
                            }
                        }}
                    />
                </div>
            </div>

            {sensorData.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    <GaugeCard
                        title="Temperature"
                        icon={<Thermometer />}
                        minValue={rangeData.temp.min}
                        maxValue={rangeData.temp.max}
                        value={sensorData.at(-1).temp}
                        data={createGaugeData(
                            sensorData.at(-1).temp,
                            rangeData.temp.max,
                            rangeData.temp.warningThreshold,
                            rangeData.temp.dangerThreshold
                        )}
                    />

                    <GaugeCard
                        title="Humidity"
                        icon={<Droplets />}
                        minValue={rangeData.hum.min}
                        value={sensorData.at(-1).hum}
                        maxValue={rangeData.hum.max}
                        data={createGaugeData(
                            sensorData.at(-1).hum,
                            rangeData.hum.max,
                            rangeData.hum.warningThreshold,
                            rangeData.hum.dangerThreshold
                        )}
                    />
                     <GaugeCard
                        title="CO (MQ9)"
                        icon={<Wind />}
                        value={sensorData.at(-1).co}
                        minValue={rangeData.co.min}
                        maxValue={rangeData.co.max}
                        data={createGaugeData(
                            sensorData.at(-1).co,
                            rangeData.co.max,
                            rangeData.co.warningThreshold,
                            rangeData.co.dangerThreshold
                        )}
                    />
                    <GaugeCard
                        title="Air Quality"
                        icon={<FlaskRound />}
                        value={sensorData.at(-1).formaldehyde}
                        minValue={rangeData.formaldehyde.min}
                        maxValue={rangeData.formaldehyde.max}
                        data={createGaugeData(
                            sensorData.at(-1).formaldehyde,
                            rangeData.formaldehyde.max,
                            rangeData.formaldehyde.warningThreshold,
                            rangeData.formaldehyde.dangerThreshold
                        )}
                    />
                    <GaugeCard
                        title="LPG (MQ6)"
                        value={sensorData.at(-1).lpg}
                        data={createGaugeData(
                            sensorData.at(-1).lpg,
                            
                            rangeData.lpg.max,
                            rangeData.lpg.warningThreshold,
                            rangeData.lpg.dangerThreshold
                        )}
                        icon={<Flame />}
                        minValue={rangeData.lpg.min}
                        maxValue={rangeData.lpg.max}
                    />
                </div>
            )}
            <div className="grid gap-6 md:grid-cols-3">
                <SensorTrends historicalData={sensorData} />
                <Card className="bg-white/10">
                    <CardHeader className="flex flex-col gap-2 items-start">
                        <h4 className="text-2xl font-bold">Alerts</h4>
                        <p className="text-white/50 text-sm">
                            Recent sensor alerts and warnings
                        </p>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default EnvironmentalSensor
