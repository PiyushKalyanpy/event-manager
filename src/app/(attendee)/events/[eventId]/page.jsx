'use client'

import { Avatar, Button, Divider } from '@heroui/react'
import { Banknote, Calendar, Clock, MapPin, Star } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Image from 'next/image'
import PaymentButton from '@/components/shared/PaymentButton'
import PercentageBadge from '@/components/icons/PercentageBadge'
import { Suspense } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'

const Page = ({ params }) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const path = usePathname()
    const eventId = path.split('/')[2]
    const router = useRouter()
    const { user } = useAuth()
    const { events, selectedEvent, userEvents } = useEvent()
    console.log(selectedEvent, 'sads')

    const currentEvent = selectedEvent.data

    if (!currentEvent) {
        return <div>Not Found !</div>
    }
    if (!user) {
        router.push('/login')
    }

    console.log(user, 'user')

    return (
        <div className="  rounded-3xl w-screen flex justify-center p-4  md:p-8 min-h-screen">
            <Image
                src="https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg"
                alt="bg"
                className="object-cover absolute blur-2xl brightness-50  z-0 w-screen h-screen"
                width={100}
                quality={1}
                height={100}
            />
            <div className=" w-full md:w-3/4 flex flex-col gap-5 z-10 ">
                <Image
                    alt="df"
                    width={1000}
                    height={1000}
                    className="w-full h-72 object-cover rounded-3xl "
                    src={currentEvent.imageURL}
                />

                <div className="flex flex-col md:flex-row gap-4  ">
                    {/* header */}
                    <div className=" rounded-2xl w-full md:w-3/4 flex flex-col gap-4 ">
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-3xl font-bold ">
                                {currentEvent.name}
                            </h2>
                            <p className="text-sm text-neutral-400">
                                {currentEvent.short_description}
                            </p>
                        </div>
                        {/* description */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">About </h2>
                            <p className="flex gap-3 items-center leading-loose ">
                                {currentEvent.description}
                            </p>
                        </div>
                        {/* location */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Location </h2>
                            <p className="flex gap-3 items-center">
                                <MapPin /> Venue: {currentEvent.venue.name},{' '}
                                {currentEvent.venue.address}
                            </p>
                        </div>
                        {/* date and time */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">
                                Date and Time{' '}
                            </h2>
                            <p className="flex gap-3 items-center">
                                <Calendar /> Date : {currentEvent.date}
                            </p>
                            <p className="flex gap-3 items-center">
                                <Clock /> Time : {currentEvent.start_time} -{' '}
                                {currentEvent.end_time}
                            </p>
                        </div>
                        {/* price */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Price </h2>
                            <p className="flex gap-3 items-center">
                                <Banknote /> Ticket Price: ₹{' '}
                                {currentEvent.ticket_price}
                            </p>
                        </div>
                        {/* category */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Category </h2>
                            <p className="flex gap-3 items-center">
                                {currentEvent.category}
                            </p>
                        </div>
                        {/* organized by */}
                        <div className=" bg-neutral-900/50 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">
                                Organized by{' '}
                            </h2>
                            <p className="flex gap-3 items-center">
                                <Avatar
                                    src={currentEvent.organiser.photoURL}
                                    alt={currentEvent.organiser.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                {currentEvent.organiser.name}
                            </p>
                        </div>
                    </div>
                    <div className="bg-neutral-900/50 rounded-2xl sticky top-20 w-full md:w-1/4 flex flex-col gap-4 p-4 h-fit">
                        <h2 className="text-1xl font-bold">Buy Ticket</h2>

                        {currentEvent.ticket_price === 0 ? (
                            <div>
                                <p className="text-2xl flex gap-2 items-center font-bold text-green-400">
                                    <PercentageBadge />
                                    <span>FREE</span>
                                </p>
                            </div>
                        ) : (
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col items-center w-fit">
                                    <div className="flex gap-2">
                                        <p className="text-2xl font-serif font-semibold text-yellow-300">
                                            ₹
                                        </p>
                                        <p className="text-2xl font-bold text-yellow-300">
                                            {currentEvent.ticket_price}
                                        </p>
                                    </div>
                                    <p className="text-sm py-1 text-neutral-400">
                                        General
                                    </p>
                                </div>
                            </div>
                        )}

                        {
                            <PaymentButton
                                event={currentEvent}
                                user={user}
                                color="secondary"
                                amount={parseInt(currentEvent.ticket_price)}
                                ticketType="General"
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
