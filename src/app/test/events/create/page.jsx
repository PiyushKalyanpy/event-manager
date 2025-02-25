'use client'

import {
    Button,
    Image,
    Input,
    Select,
    SelectItem,
    Textarea,
} from '@nextui-org/react'

import { Status } from '@/util/index'
import { Time } from '@internationalized/date'
import { TimeInput } from '@nextui-org/react'
import { toast } from 'react-toast'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'
import { useState } from 'react'

const CreateEvent = () => {
    const [event, setEvent]: any = useState({
        id: '',
        name: '',
        description: '',
        date: '',
        venue: '',
        status: Status.UPCOMING,
        isLive: false,
        time:'',
        tickets: {
            sold: null,
            capacity: null,
            revenue: null,
        },
        metrics: {
            attendees: null,
            feedback: null,
        },
        price: {
            general: null,
            vip: null,
        },
        organiser: {
            name: '',
            photoURL: '',
            email: '',
        },
    })

    const [image, setImage]: any = useState(null)
    const [isLoading, setIsLoading]: any = useState(false)
    const { user }: any = useAuth()
    const { createEvent }: any = useEvent()

    const handleChange = (key: string, value: any) => {
        setEvent((prevEvent: any) => {
            return {
                ...prevEvent,
                [key]: value,
            }
        })
    }

    const handleNestedChange = (section: string, key: string, value: any) => {
        setEvent((prevEvent: any) => {
            return {
                ...prevEvent,
                [section]: {
                    ...prevEvent[section],
                    [key]: value,
                },
            }
        })
    }

    const handleImage = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleCreate = async () => {
        setIsLoading(true)
        try {
            if (user) {
                await setEvent((prevEvent: any) => {
                    return {
                        ...prevEvent,
                        organiser: {
                            name: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                        },
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                })
                await createEvent(event, image)
            } else {
                throw new Error('You must be logged in to create an event')
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
        setIsLoading(false)
    }
    console.log(event)

    return (
        <div className="min-h-screen justify-center w-screen flex p-4">
            <div className="w-1/2 rounded-3xl overflow-hidden bg-sidebar border m-2">
                {/* <MainHeader label="Create Event" /> */}
                <div className="flex flex-wrap gap-4"></div>
                <form className="flex flex-col gap-4 p-4">

                    <Image
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : 'https://firebasestorage.googleapis.com/v0/b/gyanaguru-160d9.appspot.com/o/upload.png?alt=media&token=85d5b537-150a-4adc-871a-080c5417a014'
                        }
                        alt="event image"
                        width={'100%'}
                        height={200}
                        className="w-full h-full object-cover rounded-3xl"
                    />
                    <Input
                        type="text"
                        label="Name"
                        value={event.name}
                        className="text-4xl"
                        style={{ fontWeight: 'bold', fontSize: 20 }}
                        labelPlacement="outside"
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Textarea
                        label="Description"
                        value={event.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                    />
                    <Input
                        onChange={(e) => handleImage(e)}
                        type="file"
                        label="Image"
                    />
                    {/* select status */}
                    <Select
                        label="Status"
                        value={event.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <SelectItem
                            key={Status.UPCOMING}
                            value={Status.UPCOMING}
                            textValue="Upcoming"
                        >
                            Upcoming
                        </SelectItem>
                        <SelectItem
                            key={Status.COMPLETED}
                            value={Status.COMPLETED}
                            textValue="Completed"
                        >
                            Completed
                        </SelectItem>
                        <SelectItem
                            key={Status.ONGOING}
                            value={Status.ONGOING}
                            textValue="Ongoing"
                        >
                            Ongoing
                        </SelectItem>
                    </Select>
                    <Input
                        type="date"
                        label="Date"
                        value={event.date}
                        onChange={(e) => {
                            console.log(e.target.value)
                            handleChange('date', e.target.value)}}
                    />{' '}
                    <Input
                        type="text"
                        label="Category"
                        value={event.category}
                        onChange={(e) =>
                            handleChange('category', e.target.value)
                        }
                    />{' '}
                    {/* <Input
                        type="time"
                        label="Time"
                        value={event.time}
                        onChange={(e) =>
                            handleChange('time', e.target.value)
                        }
                    /> */}
                    <TimeInput
                        label="Event Time"
                        value = {event.time}
                        onChange={(e) => {
                             handleChange('time', `${e.hour}:${e.minute}`)
                        }}
                    />
                    <Input
                        type="text"
                        label="Venue"
                        value={event.venue}
                        onChange={(e) => handleChange('venue', e.target.value)}
                    />
                    <Input
                        type="number"
                        label="General Price"
                        value={event.price.general}
                        onChange={(e) =>
                            handleNestedChange(
                                'price',
                                'general',
                                e.target.value
                            )
                        }
                    />
                    <Input
                        type="number"
                        label="VIP Price"
                        value={event.price.vip}
                        onChange={(e) =>
                            handleNestedChange('price', 'vip', e.target.value)
                        }
                    />
                    <Input
                        type="number"
                        label="Tickets Capacity"
                        value={event.tickets.capacity}
                        onChange={(e) =>
                            handleNestedChange(
                                'tickets',
                                'capacity',
                                e.target.value
                            )
                        }
                    />
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            handleCreate()
                        }}
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default CreateEvent
