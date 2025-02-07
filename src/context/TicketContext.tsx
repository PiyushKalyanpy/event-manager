'use client'

import {
    Timestamp,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore'
import { createContext, useState } from 'react'

import ShortUniqueId from 'short-unique-id'
import { Ticket } from '@/types/ticket'
import { db } from '@/firebase'
import { toast } from 'react-toast'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const TicketContext = createContext<any | undefined>(undefined)

export const TicketProvider = ({ children }: any) => {
    const [tickets, setTickets] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [eventTickets, setEventTickets] = useState<any>([])
    const uid = new ShortUniqueId({ length: 10 })

    const purchaseTicket = async (
        event: any,
        user: any,
        amount: number,
        ticketType: 'VIP' | 'General',
        response: any
    ) => {
        try {
            setIsLoading(true)
            console.log(event)
            const newId = doc(collection(db, 'ids')).id
            const newTicket: Ticket = {
                id: newId,
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
                eventName: event.name,
                ...response,
            }
            await setDoc(doc(db, 'tickets', newId), newTicket).then(() => {
                toast.success('Ticket purchased successfully')
            })
        } catch (error) {
            console.log(error)
            toast.error('Failed to purchase ticket')
        } finally {
            setIsLoading(false)
        }
    }

    const getTickets = async (user: any) => {
        if (user) {
            console.log('Setting up real-time listener')
            const q = query(
                collection(db, 'tickets'),
                where('userId', '==', user.uid)
            )
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tickets = querySnapshot.docs.map((doc) => doc.data())
                console.log('Current tickets: ', tickets)
                setTickets(tickets) // Assuming setTickets updates the UI state
            })

            return unsubscribe // Return the unsubscribe function if you need to stop listening later
        }
    }

    const scannedTicket = async (secureCode: any) => {
        const q = query(
            collection(db, 'tickets'),
            where('secureCode', '==', secureCode)
        )
        const querySnapshot = await getDocs(q)
        const ticket = querySnapshot.docs[0]?.data()
        console.log(ticket)

        if (ticket) {
            toast.info('getting ticket')
            const ticketRef = doc(db, 'tickets', ticket.id)
            const batch = writeBatch(db)
            batch.update(ticketRef, { status: 'Scanned' })
            batch.update(ticketRef, { scannedAt: Timestamp.now() })
            await batch.commit()
            toast.success('Ticket not found')
        } else {
            toast.error('Ticket not found')
        }
    }

    const getTicketByEvent = async (eventid: string) => {
        setIsLoading(true)
        try {
            console.log('Getting Ticket')
            const snapshots = await getDocs(
                query(
                    collection(db, 'tickets'),
                    where('eventId', '==', eventid)
                )
            )
            const eventData = snapshots.docs.map((item: any) => item?.data())
            setEventTickets(eventData)
        } catch (error) {
            console.error('Error fetching events: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TicketContext.Provider
            value={{
                tickets,
                isLoading,
                error,
                purchaseTicket,
                getTickets,
                scannedTicket,
                getTicketByEvent,
                eventTickets,
            }}
        >
            {children}
        </TicketContext.Provider>
    )
}
