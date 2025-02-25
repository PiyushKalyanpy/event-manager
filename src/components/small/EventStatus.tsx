import { useEffect, useState } from 'react'

import { Chip } from '@heroui/react'
import { Status } from '@/util'

const EventStatus = ({ statusType }: any) => {
    const [status, setStatus] = useState<Status>(Status.UPCOMING)
    const [color, setColor]: any = useState()

    useEffect(() => {
        if (statusType == Status.COMPLETED) {
            setColor('danger')
        }
        if (statusType == Status.UPCOMING) {
            setColor('success')
        }
        if (statusType == Status.ONGOING) {
            setColor('warning')
        }
    }, [statusType])

    return (
        <Chip radius="md" variant="shadow" color={color}>
            {statusType}
        </Chip>
    )
}

export default EventStatus
