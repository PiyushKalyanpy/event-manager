'use client'

import { Button } from '@heroui/button'

const FilterBar = () => {
    return (
        <div className="">
            <div className="flex gap-4">
                <Button variant="light" className="rounded-full border ">
                    Upcoming
                </Button>
                <Button variant="light" className="rounded-full border ">
                    Ongoing
                </Button>
                <Button variant="light" className="rounded-full border ">
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default FilterBar
