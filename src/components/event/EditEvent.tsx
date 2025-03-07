'use client'

import { Button, Input, Select, SelectItem, Textarea } from '@heroui/react'
import { useEffect, useState } from 'react'

import { Status } from '@/utils'
import { TimeInput } from '@heroui/react'
import { useEvent } from '@/hooks/useEvent'

const EditEvent = ({ eventId }: any) => {
    const { events, updateEvent }: any = useEvent()
    const selectedEvent = events.find((e: any) => e.id === eventId)

    const [event, setEvent]: any = useState({})

    useEffect(() => {
        if (selectedEvent) {
            setEvent(selectedEvent)
        }
    }, [selectedEvent])

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

    const handleUpdate = async () => {
        await updateEvent(event)
    }

    console.log(event)

    if (!event) return <div> No such event found </div>

    // write the function to update the event in firebase

    return (
        <div>
            {event && event.name && (
                // <form className="flex flex-col gap-4 p-4">
                //     {/* <Image
                //         src={
                //             image
                //                 ? URL.createObjectURL(image)
                //                 : 'https://firebasestorage.googleapis.com/v0/b/gyanaguru-160d9.appspot.com/o/upload.png?alt=media&token=85d5b537-150a-4adc-871a-080c5417a014'
                //         }
                //         alt="event image"
                //         width={'100%'}
                //         height={200}
                //         className="w-full h-full object-cover rounded-3xl"
                //     /> */}
                //     <Input
                //         type="text"
                //         label="Name"
                //         value={event.name}
                //         className="text-4xl"
                //         style={{ fontWeight: 'bold', fontSize: 20 }}
                //         labelPlacement="outside"
                //         onChange={(e) => handleChange('name', e.target.value)}
                //     />
                //     <Textarea
                //         label="Description"
                //         value={event.description}
                //         onChange={(e) =>
                //             handleChange('description', e.target.value)
                //         }
                //     />
                //     {/* <Input
                //         onChange={(e) => handleImage(e)}
                //         type="file"
                //         label="Image"
                //     /> */}
                //     {/* select status */}
                //     <Select
                //         label="Status"
                //         value={event.status}
                //         onChange={(e) => handleChange('status', e.target.value)}
                //     >
                //         <SelectItem
                //             key={Status.UPCOMING}
                //             value={Status.UPCOMING}
                //             textValue="Upcoming"
                //         >
                //             Upcoming
                //         </SelectItem>
                //         <SelectItem
                //             key={Status.COMPLETED}
                //             value={Status.COMPLETED}
                //             textValue="Completed"
                //         >
                //             Completed
                //         </SelectItem>
                //         <SelectItem
                //             key={Status.ONGOING}
                //             value={Status.ONGOING}
                //             textValue="Ongoing"
                //         >
                //             Ongoing
                //         </SelectItem>
                //     </SelectItem>
                //     <Input
                //         type="date"
                //         label="Date"
                //         value={event.date}
                //         onChange={(e) => {
                //             console.log(e.target.value)
                //             handleChange('date', e.target.value)
                //         }}
                //     />{' '}
                //     <Input
                //         type="text"
                //         label="Category"
                //         value={event.category}
                //         onChange={(e) =>
                //             handleChange('category', e.target.value)
                //         }
                //     />{' '}
                //     {/* <Input
                //         type="time"
                //         label="Time"
                //         value={event.time}
                //         onChange={(e) =>
                //             handleChange('time', e.target.value)
                //         }
                //     /> */}
                //     <TimeInput
                //         label="Event Time"
                //         value={event.time}
                //         onChange={(e) => {
                //             handleChange('time', `${e.hour}:${e.minute}`)
                //         }}
                //     />
                //     <Input
                //         type="text"
                //         label="Venue"
                //         value={event.venue}
                //         onChange={(e) => handleChange('venue', e.target.value)}
                //     />
                //     {/* <Input
                //         type="number"
                //         label="General Price"
                //         value={event.price.general}
                //         onChange={(e) =>
                //             handleNestedChange(
                //                 'price',
                //                 'general',
                //                 e.target.value
                //             )
                //         }
                //     />
                //     <Input
                //         type="number"
                //         label="VIP Price"
                //         value={event.price.vip}
                //         onChange={(e) =>
                //             handleNestedChange('price', 'vip', e.target.value)
                //         }
                //     />
                //     <Input
                //         type="number"
                //         label="Tickets Capacity"
                //         value={event.tickets.capacity}
                //         onChange={(e) =>
                //             handleNestedChange(
                //                 'tickets',
                //                 'capacity',
                //                 e.target.value
                //             )
                //         }
                //     /> */}
                //     <Button
                //         onClick={(e) => {
                //             e.preventDefault()
                //             // handleCreate()
                //         }}
                //         color="primary"
                //         type="submit"
                //     >
                //         Submit
                //     </Button>
                // </form>
                <div className="w-full items-center justify-center flex  h-screen   ">
                    <div className="flex flex-col gap-4 p-4 lg:w-1/2 border rounded-2xl  ">
                        <h3 className="font-semibold text-2xl">
                            Updating Event{' '}
                        </h3>
                        <Input
                            value={event.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                            label="Event Name"
                        />
                        <Input
                            value={event.date}
                            type="date"
                            onChange={(e) =>
                                handleChange('date', e.target.value)
                            }
                            label="Date"
                        />
                        <Input
                            value={event.time}
                            onChange={(e) =>
                                handleChange('time', e.target.value)
                            }
                            label="Time"
                            type="time"
                        />
                        <Input
                            value={event.venue}
                            onChange={(e) =>
                                handleChange('venue', e.target.value)
                            }
                            label="Venue"
                        />
                        <Input
                            value={event.price.general}
                            onChange={(e) =>
                                handleNestedChange(
                                    'price',
                                    'general',
                                    e.target.value
                                )
                            }
                            label="General Price"
                        />
                        <Input
                            value={event.price.vip}
                            onChange={(e) =>
                                handleNestedChange(
                                    'price',
                                    'vip',
                                    e.target.value
                                )
                            }
                            label="VIP Price"
                        />
                        <Input
                            value={event.tickets.capacity}
                            onChange={(e) =>
                                handleNestedChange(
                                    'tickets',
                                    'capacity',
                                    e.target.value
                                )
                            }
                            label="Tickets Capacity"
                        />
                        <Button onClick={handleUpdate} color="primary">
                            Update
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditEvent
