'use client'

import { useParams, useSearchParams } from 'next/navigation'

import { DataTableDemo } from '@/components/ticket/TicketTable2'
import DeleteEvent from '@/components/event/DeleteEvent'
import EditEvent from '@/components/event/EditEvent'
import TicketTable from '@/components/ticket/TicketTable'
import { useEffect } from 'react'
import { useTicket } from '@/hooks/useTicket'

const Studio = () => {
    const { eventid } = useParams()
    const { getTicketByEvent, eventTickets }: any = useTicket()

    const page = useSearchParams().get('p')
    console.log(eventid)

    useEffect(() => {
        if (eventTickets.length < 1) {
            getTicketByEvent(eventid)
        }
    }, [eventid])

 
    return (
        <div>
            {page == 'tickets' && (
                <div>
                    <DataTableDemo data={eventTickets} />
                </div>
            )}

            {page == 'delete-event' && (
                <div>
                    <DeleteEvent />{' '}
                </div>
            )}
            {page == 'edit-event' && (
                <div>
                    <EditEvent eventId={eventid} />{' '}
                </div>
            )}
        </div>
    )
}

export default Studio
