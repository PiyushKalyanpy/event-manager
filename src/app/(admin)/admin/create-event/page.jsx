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
import { Modal, ModalBody, ModalContent, useDisclosure } from '@heroui/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { compressImage } from '@/util/index'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { useLive } from '@/hooks/useLive'
import { useState } from 'react'

const CreateEvent = () => {
    const [newImage, setNewImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [event, setEvent] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const {createLiveEvent} = useLive()
    const { user } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = await Object.fromEntries(new FormData(e.currentTarget))
        await setEvent(data)

        if (!user) {
            return toast.error('Please login to create an event')
        }

        const newEvent = {
            name: data.name,
            short_description: data.short_description,
            description: data.description,
            category: data.category,
            date: data.date,
            start_time: data['date.start_time'],
            end_time: data['date.end_time'],
            venue: {
                name: data['venue.name'],
                address: data['venue.address'],
                capacity: parseInt(data['venue.capacity']),
            },
            max_attendees: parseInt(data.max_attendees),
            ticket_price: parseInt(data.ticket_price),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            organiser: {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                photoURL: user.photoURL,
            },
        }
        console.log(newEvent)
        const newId = doc(collection(db, 'events')).id
        if (newImage) {
            const response = await fetch(newImage)
            const blob = await response.blob()

            const storageRef = ref(
                storage,
                `events/${data.name}-${new Date().toISOString()}.jpg`
            )

            await uploadBytes(storageRef, blob)
            console.log('Image uploaded')

            const newURL = await getDownloadURL(storageRef)
            setNewImage(newURL)
            await setDoc(doc(db, 'events', newId), {
                ...newEvent,
                imageURL: newURL,
                id: newId,
            })
                .then(() => {
                    toast.success('Event Created')
                    createLiveEvent(newId)
                })
                .catch((err) => toast.error(err.message))
        }

        if (!newImage) {
            toast.error('Please upload an image')
            setLoading(false)
            return
        }
        setLoading(false)
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const compressedFile = await compressImage(file, 1).then((it) => {
            const imageUrl = URL.createObjectURL(it)
            setNewImage(imageUrl)
        })
    }

    return (
        <div className="w-full flex flex-col items-center p-8  justify-center overflow-y-scroll">
            <Modal isOpen={loading} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="flex items-center p-8 ">
                                <h2 className="text-2xl font-bold p-4 ">
                                    Creating Event
                                </h2>
                                <CircularProgress />
                                <Button
                                    onPress={() => setLoading(false)}
                                    variant="flat"
                                    color="danger"
                                >
                                    Cancel{' '}
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Form
                onSubmit={onSubmit}
                className="md:w-1/2 flex gap-4 p-4 bg-black/60 rounded-2xl flex-col h-fit  items-center justify-center  "
            >
                {newImage && (
                    <img
                        src={newImage}
                        alt="Uploaded Image"
                        className="w-full h-64 object-contain bg-black/30 rounded-2xl "
                    />
                )}
                <Input
                    type="file"
                    placeholder={'Upload Image'}
                    name="imageURL"
                    isRequired
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleImageUpload(e)}
                />

                <label className='text-start w-full'>Event Name</label>

                <Input
                    // label="Event Name"
                    name="name"
                    isRequired
                    placeholder="Event Name"
                    className=""
                />
                <label className='text-start w-full'>Short Description</label>
                <Input
                    // label="Short Description"
                    name="short_description"
                    isRequired
                    placeholder="Short Description"
                    className=""
                />
                <label className='text-start w-full'>Description</label>
                <Textarea
                    placeholder="Description"
                    className=""
                    isRequired
                    name="description"
                    label="Description"
                />
                <label className='text-start w-full'>Category</label>
                <Input
                    name="category"
                    // label="Category"
                    isRequired
                    placeholder="Category"
                    className=""
                />
                <label className='text-start w-full'>Date</label>
                <DateInput className="" isRequired name="date" />
                <label className='text-start w-full'>Start Time</label>
                <TimeInput
                    className=""
                    isRequired
                    // label="Start Time"
                    hideTimeZone="false"
                    hourCycle={12}
                    name="date.start_time"
                />
                <label className='text-start w-full'>End Time</label>
                <TimeInput
                    className=""
                    // label="End Time"
                    hourCycle={12}
                    name="date.end_time"
                />
                {/* venue */}
                <div className="w-full flex  flex-col gap-4 py-2 ">
                <label className='text-start w-full'>Venue Name</label>
                    <Input
                        // label="Venue Name"
                        isRequired
                        name="venue.name"
                        placeholder="Venue Name"
                        className=""
                    />
                    <label className='text-start w-full'>Venue Address</label>
                    <Input
                        // label="Venue Address"
                        name="venue.address"
                        isRequired
                        placeholder="Venue Address"
                        className=""
                    />
                    <label className='text-start w-full'>Venue Capacity</label>
                    <NumberInput
                        // label="Venue Capacity"
                        name="venue.capacity"
                        placeholder="Venue Capacity"
                        className=""
                    />
                </div>
                <label className='text-start w-full'>Max Attendees</label>
                <NumberInput
                    placeholder="Max Attendees"
                    // label="Max Attendees"
                    isRequired
                    name="max_attendees"
                />
                <label className='text-start w-full'>Ticket Price</label>
                <NumberInput
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                                ₹
                            </span>
                        </div>
                    }
                    placeholder="Ticket Price"
                    // label="Ticket Price"
                    isRequired
                    name="ticket_price"
                />

                <Button color="primary" type="submit" className="w-full">
                    Create Event
                </Button>
            </Form>
        </div>
    )
}
export default CreateEvent
