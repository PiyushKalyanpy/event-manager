'use client';

import { Timestamp, collection, doc, getDocs, query, setDoc, where, writeBatch } from 'firebase/firestore';
import { createContext, useState } from 'react';

import ShortUniqueId from 'short-unique-id'
import { db } from '@/firebase'
import { toast } from 'react-toastify'

export const TicketContext = createContext()

export default function TicketProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const [userTickets, setUserTickets] = useState([])
    const [eventTickets, setEventTickets] = useState([])
    const uid = new ShortUniqueId({ length: 10 })

    const purchaseTicket = async (
        event,
        user,
        amount,
        ticketType,
        response
    ) => {
        try {
            setIsLoading(true)
            const newId = doc(collection(db, 'ids')).id

            if (user) {
                const newTicket = {
                    id: newId,
                    eventId: event.id,
                    userId: user.uid,
                    price: amount,
                    status: 'Booked',
                    user: {
                        name: user.name,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                    ticketType: ticketType,
                    secureCode: uid.rnd().toString(),
                    createdAt: new Date().toISOString(),
                    purchaseTime: new Date().toISOString(),
                    eventName: event.name,
                    venue : event.venue, 
                    eventImage : event.imageUrl,
                    eventDate: event.date,
                    ...response,
                }

                await setDoc(doc(db, 'tickets', newId), newTicket)
                toast.success('Ticket purchased successfully')
            } else {
                toast.error('User not found. Please login to purchase tickets')
            }
        } catch (error) {
            console.error('Error purchasing ticket:', error)
            toast.error('Failed to purchase ticket. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const getTicketByUserId = async (userId) => {
        setIsLoading(true)
        console.log(userId, 'downloading')
        try {
            const snapshot = await getDocs(
                query(collection(db, 'tickets'), where('userId', '==', userId))
            )

            console.log(snapshot.docs)
            const tickets = snapshot.docs.map((doc) => doc.data())
            setUserTickets(tickets)
            console.log(tickets)
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    const getTicketByEventId = async (eventId) => {
        setIsLoading(true)
        try {
            const snapshot = await getDocs(
                collection(db, 'tickets', where('eventId', '==', eventId))
            )
            const tickets = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            setEventTickets(tickets)
        } catch (error) {
            console.error(error)
        }
    }

    const scanTicket = async (secureCode) => {
        setIsLoading(true)
        try {
            console.log(secureCode) 
            const q = query(
                collection(db, 'tickets'),
                where('secureCode', '==', secureCode)
            )
            const querySnapshot = await getDocs(q)
            const ticket = querySnapshot.docs[0].data()
            console.log(ticket.status)

            if (ticket) {
                if (ticket.status === 'Scanned') {
                    toast.error('Ticket is already scanned')
                } else {
                    console.log('scanning tickets')
                    const batch = writeBatch(db)
                    const ticketRef = doc(db, 'tickets', ticket.id)
                    batch.update(ticketRef, { status: 'Scanned' })
                    batch.update(ticketRef, { scannedAt: Timestamp.now() })
                    await batch.commit()
                    toast.success('Ticket scanned successfully')
                }
            } else {
                toast.error('Ticket not found')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TicketContext.Provider value={{
            purchaseTicket,
            getTicketByUserId,
            getTicketByEventId,
            scanTicket,
            isLoading,
            userTickets,
            eventTickets,
        }}>{children}</TicketContext.Provider>
    )
}
