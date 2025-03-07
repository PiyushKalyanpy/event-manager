'use client'

import {
    Button,
    CircularProgress,
    DateInput,
    Form,
    Input,
    NumberInput,
    Textarea,
    TimeInput,
} from '@heroui/react'
import { CalendarDate, parseDate } from '@internationalized/date'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/react'
import { db, storage } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Time } from '@internationalized/date'
import { compressImage } from '@/util/index'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'

const UpdateEvent = () => {
    const [eventData, setEventData] = useState(null)
    const [newImage, setNewImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpenChange } = useDisclosure()
    const { user } = useAuth()
    const router = useRouter()
    const { selectedEvent } = useEvent()

    useEffect(() => {
        setEventData(selectedEvent.data)
    }, [selectedEvent])

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!user) {
            toast.error('Please login to update the event')
            return
        }

        const formData = Object.fromEntries(new FormData(e.currentTarget))

        const updatedEvent = {
            name: formData.name,
            short_description: formData.short_description,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            start_time: formData['date.start_time'],
            end_time: formData['date.end_time'],
            venue: {
                name: formData['venue.name'],
                address: formData['venue.address'],
                capacity: parseInt(formData['venue.capacity']),
            },
            max_attendees: parseInt(formData.max_attendees),
            ticket_price: parseInt(formData.ticket_price),
            updatedAt: new Date().toISOString(),
        }

        try {
            const eventRef = doc(db, 'events', eventData.id)

            if (newImage) {
                // Upload new image if changed
                const response = await fetch(newImage)
                const blob = await response.blob()
                const storageRef = ref(
                    storage,
                    `events/${formData.name}-${Date.now()}.jpg`
                )
                await uploadBytes(storageRef, blob)
                const newURL = await getDownloadURL(storageRef)
                updatedEvent.imageURL = newURL
            }

            await updateDoc(eventRef, updatedEvent)
            toast.success('Event updated successfully')
            router.push('/events') // Redirect after update
        } catch (error) {
            console.log('Error updating event:', error)
            toast.error('Error updating event')
        } finally {
            setLoading(false)
        }
    }

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const compressedFile = await compressImage(file, 1).then((it) => {
            const imageUrl = URL.createObjectURL(it)
            setNewImage(imageUrl)
        })
    }

    if (loading) {
        return <CircularProgress className="m-auto" />
    }

    if (!eventData) {
        return <p className="text-center text-red-500">Event data not found</p>
    }

    const a = parseInt(eventData.start_time.slice(0, 2))
    const b = parseInt(eventData.start_time.slice(3, 5))

    return (
        <div className="w-full flex flex-col items-center p-8 justify-center overflow-y-scroll">
            {/* Loading Modal */}
            <Modal isOpen={loading} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody className="flex items-center p-8">
                        <h2 className="text-2xl font-bold p-4">
                            Updating Event
                        </h2>
                        <CircularProgress />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Update Event Form */}
            <Form
                onSubmit={onSubmit}
                className="w-1/2 flex flex-col gap-4 p-4 bg-black/60 rounded-2xl"
            >
                {newImage || eventData.imageURL ? (
                    <img
                        src={newImage || eventData.imageURL}
                        alt="Event Image"
                        className="w-full h-64 object-contain bg-black/30 rounded-2xl"
                    />
                ) : null}

                <Input
                    type="file"
                    placeholder="Upload Image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                />

                <Input
                    label="Event Name"
                    name="name"
                    defaultValue={eventData.name}
                />
                <Input
                    label="Short Description"
                    name="short_description"
                    defaultValue={eventData.short_description}
                />
                <Textarea
                    label="Description"
                    name="description"
                    defaultValue={eventData.description}
                />
                <Input
                    label="Category"
                    name="category"
                    defaultValue={eventData.category}
                />
                <DateInput
                    label="Date"
                    name="date"
                    granularity="day"
                    defaultValue={parseDate(eventData.date)}
                />

                <TimeInput
                    label="Start Time"
                    name="date.start_time"
                    hourCycle={12}
                    defaultValue={new Time(a, b)}
                />
                <TimeInput
                    label="End Time"
                    hourCycle={12}
                    name="date.end_time"
                    defaultValue={
                        new Time(
                            eventData.end_time.slice(0, 2),
                            eventData.end_time.slice(3, 5)
                        )
                    }
                />

                {/* <TimeInput
                    label="End Time"
                    name="date.end_time"
                    defaultValue={eventData.end_time}
                /> */}

                {/* Venue Section */}
                <div className="w-full flex flex-col gap-4 py-2">
                    <Input
                        label="Venue Name"
                        name="venue.name"
                        defaultValue={eventData.venue?.name}
                    />
                    <Input
                        label="Venue Address"
                        name="venue.address"
                        defaultValue={eventData.venue?.address}
                    />
                    <NumberInput
                        label="Venue Capacity"
                        name="venue.capacity"
                        defaultValue={eventData.venue?.capacity}
                    />
                </div>

                <NumberInput
                    label="Max Attendees"
                    name="max_attendees"
                    defaultValue={eventData.max_attendees}
                />
                <NumberInput
                    label="Ticket Price"
                    name="ticket_price"
                    startContent={
                        <span className="text-default-400 text-small">₹</span>
                    }
                    defaultValue={eventData.ticket_price}
                />

                <Button color="primary" type="submit" className="w-full">
                    Update Event
                </Button>
            </Form>
        </div>
    )
}

export default UpdateEvent
