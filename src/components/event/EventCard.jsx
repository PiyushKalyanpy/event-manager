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
    const { id, name, date, time, venue, status, imageURL, price, userId } =
        event.event.data
    const { user } = useAuth()
    const { updateSelectedEvent } = useEvent()

    const path = usePathname()
    const isEventPage = path.includes('events')
    const router = useRouter()

    const onCardClick = () => {
        updateSelectedEvent(id)
        router.push(`/events/${id}`)
    }

    return (
        <div onClick={onCardClick}>
            <Card className=" hover:scale-105 cursor-pointer z-10  p-4 h-fit w-full bg-neutral-900 border-0 group/item">
                <CardHeader className="w-full  p-0 rounded-2xl overflow-hidden h-32">
                    <Image
                        className="w-full h-32  object-cover border rounded-2xl border-neutral-800/40  "
                        width={1000}
                        height={1000}
                        src={imageURL}
                        alt="logo"
                    />
                </CardHeader>
                <CardBody className=" flex gap-4 ">
                    <div className="flex gap-4  items-center">
                        {status === 'Ongoing' && <LiveBlink />}
                        <EventStatus statusType={status} />
                    </div>
                    <h3 className="text-xl pt-4 text-ellipsis line-clamp-1 font-bold">
                        {name}{' '}
                    </h3>
                    <div className="flex  items-center gap-12 pt-4">
                        <IconWithValue icon={Calendar} label={date} />
                        <IconWithValue icon={Clock} label={time} />
                    </div>
                    <IconWithValue icon={Map} label={venue} />
                    {!isEventPage && (
                        <div className="flex  items-center gap-4  ">
                            <IconWithValue icon={Users} label="250 attendees" />
                            <IconWithValue
                                icon={Ticket}
                                label="30 tickets left"
                            />
                        </div>
                    )}
                </CardBody>
                {/* show price in card footer */}

                {user && (userId == user.uid) ? (
                    <CardFooter className="   gap-2    transition duration-800 ease-in-out bottom-0  backdrop-blur-sm p-4   left-0 pt-8 ">
                        <Button
                            variant="light"
                            className="rounded-full w-full border "
                            startContent={<Radio size={16} />}
                            onClick={() => {
                                router.refresh()
                                router.push(`/${id}/studio`)
                            }}
                        >
                            View in Studio
                        </Button>
                    </CardFooter>
                ) : (
                    <CardFooter className=" border-t  ">
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="flex gap-2">
                                    <p className="text-lg font-serif  ">₹</p>
                                    <p className="text-lg  ">{price.vip}</p>
                                </div>
                                <p className="text-sm py-1 text-neutral-400 ">
                                    vip
                                </p>
                            </div>

                            <div>
                                <div className="flex gap-2">
                                    <p className="text-lg font-serif   text-yellow-300">
                                        ₹
                                    </p>
                                    <p className="text-lg  font-bold text-yellow-300">
                                        {price.general}
                                    </p>
                                </div>
                                <p className="text-sm py-1 text-neutral-400 ">
                                    general
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
