'use client'

import { TicketContext } from '../context/TicketContext'
import { useContext } from 'react'

export const useTicket = () => {
    return useContext(TicketContext)
}
