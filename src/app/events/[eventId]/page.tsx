'use client'

import { Banknote, Calendar, Clock, MapPin, Star } from 'lucide-react'
import { Button, Divider } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Image from 'next/image'
import PaymentButton from '@/components/shared/PaymentButton'
import PercentageBadge from '@/components/icons/PercentageBadge'
import { Suspense } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'

const Page = ({ params }: any) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const path = usePathname()
    const eventId = path.split('/')[2]
    const router = useRouter()
    const { user }: any = useAuth()
    const { events }: any = useEvent()

    const currentEvent =
        events && events.find((event: any) => event.id === eventId)

    if (!currentEvent) {
        return <div>Not Found !</div>
    }
    if(!user) {
        router.push('/login')
    }

    return (
        <div className=" bg-black rounded-3xl w-screen flex justify-center p-4  md:p-8 min-h-screen">
           
            <div className=" w-full md:w-3/4 flex flex-col gap-5  ">
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
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-3xl font-bold ">
                                {currentEvent.name}
                            </h2>
                            {/* <h2 className=" ">Educational | 1/2hr</h2> */}
                        </div>
                        {/* description */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">About </h2>
                            <p className="flex gap-3 items-center">
                                {currentEvent.description}
                            </p>
                        </div>
                        {/* location */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Location </h2>
                            <p className="flex gap-3 items-center">
                                <MapPin /> Venue: {currentEvent.location}
                            </p>
                        </div>
                        {/* date and time */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">
                                Date and Time{' '}
                            </h2>
                            <p className="flex gap-3 items-center">
                                <Calendar /> Date : {currentEvent.date}
                            </p>
                            <p className="flex gap-3 items-center">
                                <Clock /> Time : {currentEvent.time}
                            </p>
                        </div>
                        {/* price */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Price </h2>
                            <p className="flex gap-3 items-center">
                                <Banknote /> General : ₹{' '}
                                {currentEvent.price.general}
                            </p>
                            <p className="flex gap-3 items-center">
                                <Star /> VIP: ₹ {currentEvent.price.vip}
                            </p>
                        </div>
                        {/* category */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">Category </h2>
                            <p className="flex gap-3 items-center">
                                {' '}
                                {currentEvent.category}
                            </p>
                        </div>{' '}
                        {/* organized by */}
                        <div className=" bg-neutral-900/70 rounded-2xl w-full flex flex-col gap-4 p-4 ">
                            <h2 className="text-1xl font-bold ">
                                Organized by{' '}
                            </h2>
                            <p className="flex gap-3 items-center">
                                {currentEvent.organiser.name}
                            </p>
                        </div>
                    </div>
                    {/* booking */}
                    <div className=" bg-neutral-900/70 rounded-2xl sticky top-20 w-full md:w-1/4 flex flex-col gap-4 p-4 h-fit ">
                        <h2 className="text-1xl font-bold ">Buy Ticket </h2>
                       {
                        currentEvent.price.general && currentEvent.price.vip   === '0' ? (
                            <div>
                                  <p className="text-2xl  flex gap-2 items-center font-bold text-green-400">
                                       <PercentageBadge/><p> FREE</p>
                                    </p>
                            </div>
                        ) : (
                            <div className="flex  w-full justify-between">
                            <div className="flex flex-col items-center w-fit ">
                                <div className="flex gap-2 ">
                                    <p className="text-2xl font-serif  font-semibold  text-yellow-300">
                                        ₹
                                    </p>
                                    <p className="text-2xl  font-bold text-yellow-300">
                                        {currentEvent.price.general}
                                    </p>
                                </div>
                                <p className="text-sm py-1 text-neutral-400 ">
                                    general
                                </p>
                            </div>
                            <Divider orientation="vertical" className="h-10" />
                            <div className="flex flex-col items-center w-fit ">
                                <div className="flex gap-2 ">
                                    <p className="text-2xl font-serif    ">₹</p>
                                    <p className="text-2xl   text-white  ">
                                        {currentEvent.price.vip}
                                    </p>
                                </div>
                                <p className="text-sm py-1 text-neutral-400 ">
                                    vip
                                </p>
                            </div>
                        </div>
                        )
                       }
                      {user &&     <PaymentButton
                            event={currentEvent}
                            user={user}
                            color="secondary"
                            amount={parseInt(currentEvent.price.general)}
                            ticketType="General"
                        />}
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default Page

/*

 <PaymentButton
                            color="primary"
                            event={currentEvent}
                            user={user}
                            amount={parseInt(currentEvent.general_price)}
                        />
                        {/* <Button onClick={() => purchaseTicket(currentEvent, user, currentEvent.general_price)} > Purchase</Button> 

                        <PaymentButton
                            event={currentEvent}
                            user={user}
                            color="secondary"
                            amount={parseInt(currentEvent.vip_price)}
                        />

*/
