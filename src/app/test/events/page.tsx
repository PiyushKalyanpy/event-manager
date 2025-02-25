'use client'

import EventCard from '@/components/event/EventCard'
import { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'

const EventsPage = () => {
    const { events, getAllEvents }: any = useEvent()
    console.log(events)

    // useEffect(() => {
    //     if (events.length === 0) {
    //         getAllEvents()
    //     }
    // }, [])

    return (
        <div className="full-page   flex-col    ">
            {/* <MainHeader label="Book Events" /> */}
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 py-8 ">{/* <FilterBar /> */}</div>
                <div className="w-5/6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events &&
                        events.map((event: any) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default EventsPage
