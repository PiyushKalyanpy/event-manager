'use client'

import { Card, CardBody, CardHeader, Chip, Divider, Input } from '@heroui/react';

import { Slider } from '@heroui/slider'
import { useSensor } from '@/hooks/useSensor'

const SensorSection = ({ title, data }) => {
    const { updateRangeData } = useSensor()
    const handleChange = (key, value) => {
        updateRangeData(title, key, value)
    }
    return (
        <div className="p-4 w-full   bg-black/20  rounded-xl flex flex-col gap-8 ">
            <div className="flex  items-center justify-between">
                <h3>{title}</h3>
                <div className="flex items-center gap-2 font-semibold">
                    <Chip color="warning" variant="flat">
                        Warning : {data.warningThreshold}
                    </Chip>
                    <Chip color="danger" variant="flat">
                        Danger : {data.dangerThreshold}
                    </Chip>
                </div>
            </div>
            <Divider className="bg-white/20" />
            <div className="flex gap-2">
                <Input
                    label="min"
                    value={data.min}
                    variant="flat"
                    defaultValue={data.min}
                    onChange={(e) => handleChange('min', e.target.value)}
                />
                <Input
                    label="max"
                    value={data.max}
                    variant="flat"
                    defaultValue={data.max}
                    onChange={(e) => handleChange('max', e.target.value)}
                />
            </div>
            <Slider
                className="max-w-md"
                defaultValue={data.warningThreshold}
                label={'Warning threshold'}
                value={data.warningThreshold}
                onChange={(value) => handleChange('warningThreshold', value)}
                maxValue={data.max}
                minValue={data.min}
                step={1}
            />
            <Slider
                className="max-w-md"
                defaultValue={data.dangerThreshold}
                label={'Danger threshold'}
                maxValue={data.max}
                value={data.dangerThreshold}
                onChange={(value) => handleChange('dangerThreshold', value)}
                minValue={data.min}
                step={1}
            />
        </div>
    )
}

const StudioSetting = () => {
    const { rangeData } = useSensor()

    return (
        <div className="w-full p-8">
            <Card className="bg-neutral-800/40 p-4">
                <CardHeader className="flex flex-col gap-2 items-start">
                    <h4 className="text-2xl font-bold">Sensor Settings</h4>
                    <p className="text-white/50 text-sm">
                        Update the settings for sensors.
                    </p>
                </CardHeader>
                <CardBody className="flex flec-col gap-4 grid grid-cols-2">
                    {Object.entries(rangeData).map(([label, data]) => (
                        <SensorSection key={label} title={label} data={data} />
                    ))}
                </CardBody>
            </Card>
        </div>
    )
}

export default StudioSetting
