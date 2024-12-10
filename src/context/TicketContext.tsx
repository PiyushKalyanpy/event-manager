import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { createContext, useState } from 'react'

import ShortUniqueId from 'short-unique-id'
import { Ticket } from '@/types/ticket'
import { db } from '@/firebase'
import { toast } from 'react-toast'
import { v4 as uuidv4 } from 'uuid'

export const TicketContext = createContext<any | undefined>(
    undefined
)

export const TicketProvider = ({ children }: any) => {
    const [tickets, setTickets] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const uid = new ShortUniqueId({ length: 10 });


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
                secureCode: uid.rnd(),
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

    const getTickets = async (user : any) => {
        if (user) {
          console.log("getting data ");
          const q = query(collection(db, "tickets"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((item) => item?.data());
          setTickets(data);
        }
      };

    return (
        <TicketContext.Provider
            value={{
                tickets,
                loading,
                error,
                purchaseTicket,
                getTickets
            }}
        >
            {children}
        </TicketContext.Provider>
    )
}
