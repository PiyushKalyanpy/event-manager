import { Trash, Trash2 } from 'lucide-react'

import { Button } from '@nextui-org/react'
import EventSidebarHeader from '../sidebar/event/header-sidebar'
import Header from '../shared/Header'
import Image from 'next/image'
import { SidebarHeader } from '@/components/ui/sidebar'
import { useEvent } from '@/hooks/useEvent'
import { useParams } from 'next/navigation'

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
                    <Button variant="shadow" color="danger">
                        {' '}
                        <Trash2 /> Delete Event
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEvent
