'use client'

import EventCard from '@/components/event/EventCard'
import Image from 'next/image'
import { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'

const EventsPage = () => {
    const { events, getAllEvents, userEvents } = useEvent()
    console.log(events)

    useEffect(() => {
        if (events.length === 0) {
            getAllEvents()
        }
    }, [])

    return (
        <div className="full-page   flex-col    ">
                <Image
                            src="https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg"
                            alt="bg"
                            className="object-cover absolute blur-2xl brightness-50  z-0 w-screen h-screen"
                            width={100}
                            quality={1}
                             height={100}
                        />
            {/* <MainHeader label="Book Events" /> */}
            <div className="flex flex-col items-center justify-center">
                <div className="w-5/6 py-8 ">{/* <FilterBar /> */}</div>
                <div className="w-5/6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events &&
                        events.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default EventsPage
