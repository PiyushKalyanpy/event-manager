'use client'

import { FileDown, FilterIcon, Share, Sliders } from 'lucide-react'

import { Button } from '@nextui-org/react'

const ActionBar = () => {
    return (
        <div className="p-4 flex gap-4 items-end  w-full justify-end">
            <Button
                variant="light"
                className="rounded-full border "
                startContent={<Sliders size={16} />}
            >
                Filters
            </Button>
            <Button
                variant="light"
                className="rounded-full border "
                startContent={<Share size={16} />}
            >
                Share
            </Button>
            <Button
                variant="light"
                className="rounded-full border "
                startContent={<FileDown size={16} />}
            >
                Export
            </Button>
        </div>
    )
}

export default ActionBar
