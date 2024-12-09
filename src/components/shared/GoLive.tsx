import { Label } from '@/components/ui/label'
import { RadioIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

const GoLive = () => {
    const [isLive, setIsLive] = useState(false)

    return (
        <div>
            <div className="flex items-center space-x-2 border px-4 py-2  rounded-3xl">
                {isLive ? (
                    <div className="flex  relative w-4 h-4 ">
                        <div className="w-4 absolute animate-ping h-4 bg-red-600 rounded-full shadow-xl shadow-red-500/50" />
                        <div className="w-4 absolute  h-4 bg-red-600 rounded-full shadow-lg shadow-red-500/50" />
                    </div>
                ) : (
                    <div>
                        {' '}
                        <RadioIcon />{' '}
                    </div>
                )}
                <Label htmlFor="airplane-mode">
                    {isLive ? 'End live' : 'Go Live'}
                </Label>
                <Switch
                    id="airplane-mode"
                    checked={isLive}
                    onCheckedChange={() => setIsLive(!isLive)}
                />
            </div>
        </div>
    )
}

export default GoLive
