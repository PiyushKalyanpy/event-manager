import { Image } from '@nextui-org/react'
import { SidebarHeader } from '@/components/ui/sidebar'
import { useEvent } from '@/hooks/useEvent'
import { useParams } from 'next/navigation'

const EventSidebarHeader = () => {
    const { eventid } = useParams()
    // events from useEVents
    const { events }: any = useEvent()
    const event = events.find((event: any) => event.id === eventid)
     if (!event) return null
    return (
        <div className="p-2  bg-neutral-950">
            <SidebarHeader className="">
                <div className="flex gap-4 items-center">
                    <Image
                        src={`${event.imageURL}`}
                        width={50}
                        height={50}
                        alt="logo"
                        className="object-cover rounded-xl"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-white text-ellipsis line-clamp-1 font-bold">
                            {event.name}
                        </h1>
                        <p className="text-white text-sm text-ellipsis line-clamp-1">
                            {event.venue}
                        </p>
                    </div>
                </div>
            </SidebarHeader>
        </div>
    )
}

export default EventSidebarHeader
