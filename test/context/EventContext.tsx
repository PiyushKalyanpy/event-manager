'use client';

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { Event } from '@/types/event'
import { handleError } from '@/utils/errorHandler'
import { toast } from 'react-toast'

export const EventContext = createContext<any | null>(null)
export default function EventContextProvider({ children }: any) {
    const [allEvents, setAllEvents] = useState<any[]>([])
    const [currentEvent, setCurrentEvent] = useState<any | null>(null)
    const [userEvents, setUserEvents] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

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
            setAllEvents((prevEvents: any) => [
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
            console.log('✅ getting events')
            const snapshots = await getDocs(query(collection(db, 'events')))
            const eventData = snapshots.docs.map((item: any) => item?.data())
            setAllEvents(eventData)
        } catch (error) {
            console.error('Error fetching events: ', error)
        } finally {
            setIsLoading(false)
        }
    }
    const getEventByUserId = async (userId: string) => {
        try {
            const snapshots = await getDocs(
                query(collection(db, 'events'), where('userId', '==', userId))
            )
            const eventData = snapshots.docs.map((item: any) => item?.data())
            setUserEvents(eventData)
        } catch (error) {
            console.error('Error fetching events: ', error)
        }
    }
    const getEventById = (id: string) => {
        const event = allEvents.find((event) => event.id === id)
        if (event) {
            return event
        } else {
            console.log('✅ fetching event')
            return null
        }
    }
    const updateEvent = async (event: any) => {
        try {
            const eventRef = doc(db, 'events', event.id)
            await updateDoc(eventRef, event)
            setAllEvents((prevEvents: any) =>
                prevEvents.map((prevEvent: any) =>
                    prevEvent.id === event.id ? event : prevEvent
                )
            )
        } catch (error) {
            console.error('Error updating event: ', error)
        }
    }
    const deleteEvent = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'events', id))
            setAllEvents((prevEvents: any) =>
                prevEvents.filter((event: any) => event.id !== id)
            )
        } catch (error) {
            console.error('Error deleting event: ', error)
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <EventContext.Provider
            value={{
                allEvents,
                currentEvent,
                setCurrentEvent,
                userEvents,
                isLoading,
                createEvent,
                getAllEvents,
                getEventByUserId,
                getEventById,
                updateEvent,
                deleteEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    )
}
