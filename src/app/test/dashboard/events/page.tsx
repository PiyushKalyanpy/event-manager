'use client'

import EventCard from '@/components/event/EventCard'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'

const DashboardEvent = () => {
    const { user } = useAuth()
    const { userEvents, getEventByUserId } = useEvent()

    useEffect(() => {
        if (user && userEvents.length === 0) {
            getEventByUserId(user.uid)
        }
    }, [user])

    return (
        <div className="w-5/6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userEvents &&
                userEvents.map((event: any) => (
                    <EventCard event={event} key={event.id} />
                ))}
        </div>
    )
}

export default DashboardEvent
