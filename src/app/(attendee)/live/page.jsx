'use client'

import { MapPin, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@heroui/react'
import Image from 'next/image'
import PercentageBadge from '@/components/icons/PercentageBadge'
import { useAuth } from '@/hooks/useAuth'
import { useEvent, } from '@/hooks/useEvent'
import { useTicket } from '@/hooks/useTicket'

const LiveEvent = () => {
    const { selectedEvent, userEvents, setSelectedEvent } = useEvent()
    const { userTickets, getTicketByUserId } = useTicket()
    const [eventTickets, setEventTickets] = useState([])    
    const { user } = useAuth()

    useEffect(() => {
        if (user && userTickets.length === 0) {
            // getTicketByUserId(user.uid)
        }
    }, [user])

    // filter and remove duplicate tickets with same event id
    useEffect(() => {
        const uniqueTickets = [
            ...new Map(
                userTickets.map((item) => [item.eventId, item])
            ).values(),
        ]
        setEventTickets(uniqueTickets)
    }, [userTickets])

    return (
        <div className="full-page bg-black p-4">
            <Image
                src="https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg"
                alt="bg"
                className="object-cover absolute blur-2xl  z-0 w-screen overflow-hidden h-screen"
                width={100}
                quality={1}
                height={100}
            />

            <div className="flex flex-col z-10 gap-4 w-screen overflow-hidden">
                {eventTickets.map((item) => (
                    <div key={item.id}>
                        {/* Use a unique and stable key (ideally the ticket ID) */}
                        <TicketEventCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const TicketEventCard = ({ item }) => {
    const {
        createdAt,
        eventId,
        eventName,
        eventImage,
        scannedAt,
        id,
        price,
        secureCode,
        ticketType,
        userId,
        venue,
        eventDate,
        startTime,
        endTime,
    } = item

    return (
        <div className=" w-full bg-black/50 rounded-2xl">
            <Image
                src={
                   eventImage 
                }
                className="object-cover aspect-video rounded-2xl  w-full"
                width={1000}
                quality={100}
                height={1000}
            />
            <div>
                <div className="flex z-10 w-full sm:w-3/4 h-full flex-col gap-3 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold line-clamp-1">
                        {eventName || 'Event Name Not Available'}
                    </h2>

                    <p className="flex items-center gap-2 line-clamp-1 text-ellipsis">
                        <MapPin size={16} />
                        <span className="line-clamp-1 text-sm">
                            {venue || 'Venue Not Available'}
                        </span>
                    </p>

                    <div className="text-neutral-300 text-sm">
                        <p>DATE : {eventDate || 'Date Not Available'}</p>
                        <p>
                            TIME :{' '}
                            {startTime && endTime
                                ? `${startTime} - ${endTime}`
                                : 'Time Not Available'}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <p>
                            <span className="font-bold text-yellow-300">
                                {price != 0 ? (
                                    <span className="font-bold font-serif pl-3 text-yellow-300">
                                        ₹ {price}
                                    </span>
                                ) : (
                                    <p className="text-2xl flex gap-2 items-center font-bold text-green-400">
                                        <PercentageBadge />
                                        <span>FREE</span>
                                    </p>
                                )}
                            </span>
                        </p>
                    </div>
                    <Button className="" color="primary">
                        Enter into event
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LiveEvent
