'use client'

import { useEffect, useState } from 'react'

import { CircularProgress } from '@heroui/react'
import Ticket from '@/components/ticket/Ticket'
import { useAuth } from '@/hooks/useAuth'
import { useTicket } from '@/hooks/useTicket'

const MyPurchasedEvents = () => {
    const { user } = useAuth()
    const { userTickets, getTicketByUserId } = useTicket()
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        if (user && userTickets.length === 0) {
            console.log('You have no tickets')
            getTicketByUserId(user.uid)
        }
    }, [user])
    console.log(userTickets)
    if (!user) {
        return (
            <div>
                
                <div className="flex justify-center items-center h-screen">
              
                   <CircularProgress size='lg' />
                </div>
            </div>
        ) 
    }

    if (userTickets.length === 0) {
        return <div>No tickets found.</div> 
    }

    return (
        <div className="bg-black flex flex-col min-h-screen w-screen p-8 gap-8">
            {' '} 
            {/* Simplified class names */}
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl">My Tickets</h2>{' '}
                {/* Use h2 for better semantics */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
                {' '}
                {/* More concise grid classes */}
                {userTickets.map((item) => (
                    <div key={item.id}>
                        {/* Use a unique and stable key (ideally the ticket ID) */}
                        <Ticket item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyPurchasedEvents
