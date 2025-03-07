'use client'

import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'
import { createContext, useState } from 'react'

import { db } from '@/firebase'
import { toast } from 'react-toastify'
import { uploadImage } from '@/services'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'

export const EventContext = createContext()

export default function EventProvider({ children }) {
    const [events, setEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({
        id: 'yHEugno9tmvCQnPnqjzn',
        data: {
            ticket_price: 0,
            venue: {
                address: 'Dehradun Delhi and Unified Calius',
                capacity: 400,
                name: 'Dehradun Delhi and Unified Calius',
            },
            id: 'yHEugno9tmvCQnPnqjzn',
            short_description: 'skdfjh',
            date: '2023-04-23',
            description: 'kjhskdhjf',
            name: 'Friday Evening Service',
            updatedAt: '2025-02-25T10:58:47.801Z',
            organiser: {
                photoURL:
                    'https://lh3.googleusercontent.com/a/AGNmyxaORNFuhul9r_Mh1V-RAeUXmVaW7-oKL-W6x3W_sA=s96-c',
                email: 'kalyanpiyush560@gmail.com',
                name: 'Piyush Kalyan',
                id: 'vMZXLCGZYEPVWEhtbytJ7oIcikD3',
            },
            imageURL:
                'https://firebasestorage.googleapis.com/v0/b/itsmywork-5f138.appspot.com/o/events%2FDEesign%20is%20the%20key%20uphold%20this%20is%20the%20name-2025-02-25T09%3A20%3A19.878Z.jpg?alt=media&token=2b18be30-363b-4212-bb25-8c2864617a0d',
            category: 'ksdjhfjh',
            start_time: '00:04:00',
            end_time: '15:05:00',
            max_attendees: 600,
            createdAt: '2025-02-25T09:20:19.867Z',
        },
    })
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()

    const updateSelectedEvent = (eventId) => {
        const event =
            events.find((event) => event.id === eventId) ||
            userEvents.find((event) => event.id === eventId)
        setSelectedEvent(event)
    }

    const createEvent = async (event, image) => {
        setIsLoading(true)
        try {
            if (user) {
                const eventId = doc(collection(db, ids)).id
                const imageURL = await uploadImage(image)
                await setDoc(doc(db, 'events', eventId), {
                    ...event,
                    userId: user.uid,
                    organiser: {
                        name: user.name,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    imageURL: imageURL,
                    id: eventId,
                }).then(() => {
                    toast.success('Event created successfully')
                })
                setEvents((prevEvent) => [
                    ...prevEvents,
                    {
                        ...event,
                        id: eventId,
                        imageURL: imageURL,
                    },
                ])
            }
        } catch (error) {
            toast.error('Error creating event')
            console.error(error)
        }
    }

    const updateEvent = async (event) => {
        setIsLoading(true)
        try {
            await updateDoc(doc(db, 'events', event.id), {
                ...event,
            }).then(() => {
                toast.success('Event updated successfully')
            })
            setEvents((prevEvent) =>
                prevEvents.map((prevEvent) =>
                    prevEvent.id === event.id ? event : prevEvent
                )
            )
        } catch (error) {
            toast.error('Error updating event')
            console.error(error)
        }
    }

    const deleteEvent = async (eventId) => {
        setIsLoading(true)
        try {
            await deleteDoc(doc(db, 'events', eventId)).then(() => {
                toast.success('Event deleted successfully')
            })
            setEvents((prevEvent) =>
                prevEvents.filter((event) => event.id !== eventId)
            )
        } catch (error) {
            toast.error('Error deleting event')
            console.error(error)
        }
    }

    const getAllEvents = async () => {
        setIsLoading(true)
        try {
            console.log('getAllEvents')
            const snapshot = await getDocs(collection(db, 'events'))
            const events = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            setEvents(events)
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    const getEventsByUserId = async (userId) => {
        setIsLoading(true)
        console.log(userId, 'downloading')
        try {
            const snapshot = await getDocs(
                query(
                    collection(db, 'events'),
                    where('organiser.id', '==', userId)
                )
            )
            const uevents = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            console.log(uevents)
            setUserEvents(uevents)
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    const getEventById = async (eventId) => {
        setIsLoading(true)
        console.log('getting event by id')
        try {
            const event =
                events.find((event) => event.id === eventId) ||
                userEvents.find((event) => event.id === eventId) ||
                (await getDoc(doc(db, 'events', eventId))).data()
            console.log(event)
            return event
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    const getLiveEvent  = async (eventId) => {
        setIsLoading(true)
        console.log('getting event by id')
        try {
            const event =
                events.find((event) => event.id === eventId) ||
                userEvents.find((event) => event.id === eventId) ||
                (await getDoc(doc(db, 'events', eventId))).data()
            console.log(event)
            return event
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    return (
        <EventContext.Provider
            value={{
                events,
                userEvents,
                selectedEvent,
                setSelectedEvent,
                isLoading,
                createEvent,
                updateEvent,
                deleteEvent,
                updateSelectedEvent,
                getAllEvents,
                getEventsByUserId,
                getEventById,
            }}
        >
            {children}
        </EventContext.Provider>
    )
}
