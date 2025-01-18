'use client'

import { useEffect, useState } from 'react'

import BoardingPass from '@/components/ticket/Tickets'
import Ticket from '@/components/ticket/Ticket'
import Ticket2 from '@/components/ticket/Tickets'
import TicketQr from '@/components/ticket/TicketQr'
import { useAuth } from '@/hooks/useAuth'
import { useTicket } from '@/hooks/useTicket'

const MyPurchasedEvents = () => {
    // const { user, getTickets, tickets } = useAuth();
    // console.log("TIckets ", tickets);
    const { user }: any = useAuth()
    const { tickets, getTickets }: any = useTicket()

    console.log('tickets', tickets)

    useEffect(() => {
        if (tickets.length < 1) {
            console.log('getting docs ')
            getTickets(user)
            console.log('tickets', tickets)
        }
    }, [user])

    return (
        <div className="bg-black flex flex-col gap-8  p-8  w-screen min-h-screen ">
            <div className="mb-6 flex justify-between items-center    ">
                <p className="text-2xl ">My Tickets</p>
            </div>

            <div className="grid md:grid-cols-2   gap-16 grid-cols-1 lg:grid-cols-2">
                {tickets != undefined &&
                    tickets.map((item: any) => {
                        return (
                            <div key={item.ename}>
                                <Ticket item={item} />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default MyPurchasedEvents
