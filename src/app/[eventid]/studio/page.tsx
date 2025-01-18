'use client'

import { useParams } from 'next/navigation'

const Studio = () => {
    // get the eventid from slug
    const { eventid } = useParams()
    console.log(eventid)

    return <div>Enter The studio by call{eventid}</div>
}

export default Studio
