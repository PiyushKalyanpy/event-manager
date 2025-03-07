'use client'

import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import { Calendar, Clock, Map, Radio, Share, Ticket, Users } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import EventStatus from '../small/EventStatus'
import IconWithValue from '../small/IconWithValue'
import Image from 'next/image'
import LiveBlink from '../icons/LiveBlink'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'

const EventCard = (event) => {
    const {
        name,
        short_description,
        description,
        category,
        date,
        start_time,
        end_time,
        venue,
        max_attendees,
        ticket_price,
        status,
        imageURL,
        createdAt,
        updatedAt,
        organiser,
    } = event.event.data
    const { user } = useAuth()
    const { updateSelectedEvent } = useEvent()
    const id = event.event.id

    const path = usePathname()
    const isEventPage = path.includes('events')
    const router = useRouter()

    const onCardClick = () => {
        updateSelectedEvent(id)
        router.push(`/events/${id}`)
    }

    return (
        <div className="w-full  " onClick={onCardClick}>
            <Card className="    hover:scale-105 cursor-pointer z-10 p-4 h-fit w-full bg-neutral-950/70 group/item">
                <CardHeader className="w-full p-0 rounded-2xl bg-transparent  overflow-hidden h-32">
                    <Image
                        className="w-full h-32 object-cover border rounded-2xl border-neutral-800/40"
                        width={1000}
                        height={1000}
                        src={imageURL}
                        alt="logo"
                    />
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        {status === 'Ongoing' && <LiveBlink />}
                        <EventStatus
                            statusType={
                                new Date(date) < new Date()
                                    ? 'Completed'
                                    : 'Upcoming'
                            }
                        />
                    </div>
                    <h3 className="text-xl pt-4 text-ellipsis line-clamp-1 font-bold">
                        {name}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">
                        {short_description}
                    </p>
                    <div className="flex items-center gap-12 pt-4 text-sm">
                        <IconWithValue icon={Calendar} label={date} />
                        <IconWithValue
                            icon={Clock}
                            label={`${start_time.slice(0, 5)} - ${end_time.slice(0, 5)}`}
                        />
                    </div>
                    <IconWithValue icon={Map} label={`${venue.name}`} />
                    {!isEventPage && (
                        <div className="flex items-center gap-4">
                            <IconWithValue
                                icon={Users}
                                label={`${max_attendees} attendees`}
                            />
                            <IconWithValue
                                icon={Ticket}
                                label={`${ticket_price} per ticket`}
                            />
                        </div>
                    )}
                </CardBody>

                {user && organiser.id === user.uid ? (
                    <CardFooter className="gap-2 transition duration-800  ease-in-out bottom-0  p-4 left-0 pt-8">
                        <Button
                            variant="light"
                            className="rounded-full w-full border "
                            startContent={<Radio size={16} />}
                            onPress={() => {
                                router.refresh()
                                updateSelectedEvent(id)
                                router.push(`/studio`)
                            }}
                        >
                            View in Studio
                        </Button>
                    </CardFooter>
                ) : (
                    <CardFooter className="border-t">
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="flex gap-2">
                                    <p className="text-lg font-serif">₹</p>
                                    <p className="text-lg">{ticket_price}</p>
                                </div>
                                <p className="text-sm py-1 text-neutral-400">
                                    General Admission
                                </p>
                            </div>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default EventCard
