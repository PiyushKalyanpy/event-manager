'use client'

import { useParams, useSearchParams } from 'next/navigation'

import DeleteEvent from '@/components/event/DeleteEvent'
import TicketTable from '@/components/ticket/TicketTable'
import { useEffect } from 'react'
import { useTicket } from '@/hooks/useTicket'

const Studio = () => {
    const { eventid } = useParams()
    const { getTicketByEvent, eventTickets }: any = useTicket()

    const page = useSearchParams().get('p')
    console.log(eventid)

    useEffect(() => {
        if (eventTickets.length <1) {
            getTicketByEvent(eventid)
        }
    }, [eventid])

    console.log(eventTickets)

    return (
        <div>
            {page == 'tickets' && (
                <div>
                    <TicketTable />{' '}
                </div>
            )}
            
             {page == 'delete-event' && (
                <div>
                    <DeleteEvent />{' '}
                </div>
            )}
        </div>
    )
}

export default Studio
