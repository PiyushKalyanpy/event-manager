'use client'

import EventCard from '@/components/event/EventCard'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'

const AdminEvents = () => {
    const { userEvents, getEventsByUserId } = useEvent()
    const { user } = useAuth()
    console.log(userEvents)

    useEffect(() => {
        if (user && userEvents.length === 0) {
            getEventsByUserId(user.uid)
        }
    }, [user])

    return (
        <div className="w-full">
            <div className="flex flex-col items-center    justify-center">
                <div className="w-full py-8   ">{/* <FilterBar /> */}</div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4  gap-8">
                    {userEvents &&
                        userEvents.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AdminEvents
