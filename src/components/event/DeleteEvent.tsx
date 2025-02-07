import { Button, Input } from '@nextui-org/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Trash, Trash2 } from 'lucide-react'

import EventSidebarHeader from '../sidebar/event/header-sidebar'
import Header from '../shared/Header'
import Image from 'next/image'
import { SidebarHeader } from '@/components/ui/sidebar'
import { useEvent } from '@/hooks/useEvent'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const DeleteEvent = () => {
    const { eventid } = useParams()
    // events from useEVents
    const { events }: any = useEvent()
    const event = events.find((event: any) => event.id === eventid)
    if (!event) return null
    return (
        <div>
            <div className="flex gap-4 items-start p-8">
                <Image
                    src={`${event.imageURL}`}
                    width={1000}
                    height={1000}
                    alt="logo"
                    className="object-cover rounded-xl w-96 aspect-video "
                />
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-white text-3xl text-ellipsis line-clamp-1 font-bold">
                        {event.name}
                    </h1>
                    <p className="text-white text-lg text-ellipsis line-clamp-1">
                        {event.venue}
                    </p>
                </div>
            </div>
            <div className="p-8 flex gap-8 flex-col">
                <div>
                    <h1 className="text-4xl font-semibold">
                        Delete this Event
                    </h1>
                    <p className="text-lg text-neutral-300">
                        Once you delete this Event, there is no going back.
                        Please be certain.
                    </p>
                </div>
                <div>
                    <DeleteConfirmationDialog event={event} />
                </div>
            </div>
        </div>
    )
}

const DeleteConfirmationDialog = ({ event }: any) => {
    const [eventName, setEventName] = useState('')
    const handleDelete = () => {
        // Implement your delete logic here
        console.log('Deleting event:', event.name)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex px-4 py-3 gap-4 rounded-xl shadow-2xl shadow-rose-400/40 bg-rose-600 text-white">
                    <Trash2 /> Delete Event
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Delete event</DialogTitle>
                    <DialogDescription className="text-md">
                        To proceed with deleting
                        <span className="font-bold"> {event.name} </span>
                        , please enter the event name below. Ensure that you
                        provide the exact name to avoid accidental deletions.
                        <br />
                        <br />
                        This action is irreversible. Deleting the event will
                        permanently remove all associated data. Please confirm
                        by typing the event name.
                        <br />
                        <br />
                        <Input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Enter event name"
                        />
                        <Button
                            className="mt-4"
                            
                            color={eventName === event.name ? 'danger' : 'default'}
                            onClick={handleDelete}
                            disabled={eventName !== event.name}
                        >
                            Delete Event
                        </Button>
                        {eventName && eventName !== event.name && (
                            <p className="text-sm text-red-500 mt-2">
                                Event name does not match.
                            </p>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteEvent
