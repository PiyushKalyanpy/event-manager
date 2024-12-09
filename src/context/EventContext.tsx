'use client'

import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { Event } from '@/types/event'
import { Status } from '@/utils'
import { handleError } from '@/utils/errorHandler'
import { toast } from 'react-toast'
import { useAuth } from '@/hooks/useAuth'

export const EventContext = createContext<EventContextType | null>(null)

export default function EventContextProvider({ children }: any) {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = async (image: any, id: string) => {
        try {
            const imageRef = ref(storage, `events/${image.name}`)
            await uploadBytes(imageRef, image)
            const imageURL = await getDownloadURL(imageRef)
            return imageURL
        } catch (err) {
            handleError(err)
        }
    }

    const createEvent = async (event: Event, image: any) => {
        try {
            console.log('event')
            toast.info('Creating event...')
            const newId = doc(collection(db, 'ids')).id
            const imageURL = await uploadImage(image, newId)
            await setDoc(doc(db, 'events', newId), {
                ...event,
                id: newId,
                imageURL: imageURL,
            }).then(() => {
                toast.success('Event created successfully')
            })
            setEvents((prevEvents: any) => [
                ...prevEvents,
                {
                    ...event,
                    id: newId,
                    imageURL: imageURL,
                },
            ])
        } catch (err) {
            handleError(err)
        }
    }

    const getAllEvents = async () => {
        setIsLoading(true)
        try {
            const snapshots = await getDocs(query(collection(db, 'events')))
            const eventData = snapshots.docs.map((item: any) => item?.data())
            setEvents(eventData)
        } catch (error) {
            console.error('Error fetching events: ', error)
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        if (events.length === 0) {
            console.log('✅ getting events')
            getAllEvents()
        }
    }, [])

    return (
        <EventContext.Provider
            value={{
                events,
                createEvent,
                // updateEvent,
                // deleteEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    )
}

export interface EventContextType {
    events: Event[]
    // getEvents: () => Promise<void>
    createEvent: (event: Event, image: any) => Promise<void>
    // updateEvent: (event: Event) => Promise<void>
    // deleteEvent: (id: string) => Promise<void>
}
