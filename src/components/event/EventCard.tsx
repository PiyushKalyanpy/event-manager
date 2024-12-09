'use client'

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/react'
import { Calendar, Clock, Map, Radio, Share, Ticket, Users } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import EventStatus from './EventStatus'
import IconWithValue from './IconWithValue'
import Image from 'next/image'

const EventCard = (event: any) => {
    const {id, name, date, time, venue, status, imageURL, price } = event.event

    const path = usePathname()
    const isEventPage = path.includes('events')
    const router = useRouter()

    const onCardClick = () => {
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
                    <EventStatus statusType={status} />
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

                {!isEventPage && (
                    <CardFooter className="  group-hover/item:flex hidden gap-2 absolute   transition duration-800 ease-in-out bottom-0 bg-gradient-to-tr backdrop-blur-sm p-4  from-black from-10% to-transparent to-90% left-0 pt-8 ">
                        <Button
                            isIconOnly
                            variant="light"
                            className="rounded-full border "
                            startContent={<Share size={16} />}
                        />
                        <Button
                            variant="light"
                            className="rounded-full border "
                            startContent={<Radio size={16} />}
                        >
                            View in Studio
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default EventCard
