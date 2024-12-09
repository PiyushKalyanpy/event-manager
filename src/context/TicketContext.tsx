import { collection, doc, setDoc } from 'firebase/firestore'
import { createContext, useState } from 'react'

import { Ticket } from '@/types/ticket'
import { db } from '@/firebase'
import { toast } from 'react-toast'
import { v4 as uuidv4 } from 'uuid'

interface TicketContextType {
    tickets: Ticket[]
    loading: boolean
    error: string | null

    purchaseTicket: (
        event: any,
        user: any,
        amount: number,
        ticketType: 'VIP' | 'General',
        response: any
    ) => Promise<void>
}

export const TicketContext = createContext<TicketContextType | undefined>(
    undefined
)

export const TicketProvider = ({ children }: any) => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const purchaseTicket = async (
        event: any,
        user: any,
        amount: number,
        ticketType: 'VIP' | 'General',
        response: any
    ) => {
        try {
            setLoading(true)
            console.log(event)
            const newId = doc(collection(db, 'ids')).id
            const newTicket: Ticket = {
                id: 'sd',
                eventId: event.id,
                userId: user.uid,
                price: amount,
                status: 'Booked',
                user: {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                },
                ticketType: ticketType,
                secureCode: uuidv4(),
                createdAt: new Date().toISOString(),
                purchaseTime: new Date().toISOString(),
                ...response,
            }
            await setDoc(doc(db, 'tickets', newId), newTicket).then(() => {
                toast.success('Ticket purchased successfully')
            })
        } catch (error) {
            console.log(error)
            toast.error('Failed to purchase ticket')
        } finally {
            setLoading(false)
        }
    }

    return (
        <TicketContext.Provider
            value={{
                tickets,
                loading,
                error,
                purchaseTicket,
            }}
        >
            {children}
        </TicketContext.Provider>
    )
}
