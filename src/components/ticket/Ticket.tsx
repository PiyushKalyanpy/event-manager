'use client'

import Barcode from 'react-barcode'
import { Divider } from '@nextui-org/react'
import Image from 'next/image'
import { MapIcon } from 'lucide-react'
import ShortUniqueId from 'short-unique-id'
import { unique } from 'next/dist/build/utils'
import { useEvent } from '@/hooks/useEvent'

const Ticket = ({ item }: any) => {
    console.log(item)
    const { getEventById }: any = useEvent()
    const { organiser, venue, date, time, imageURL } = getEventById(item.eventId)
    const {
        createdAt,
        eventId,
        id,
        price,
        purchaseTime,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        secureCode,
        status,
        ticketType,
        user,
        userId,
    } = item

    return (
        <div className="w-full relative flex  h-64 overflow-hidden rounded-2xl  bg-cover bg-center bg-no-repeat">
            <div className='absolute w-full h-full   z-0'>
            <Image
                src={imageURL   }
                width={900}
                height={100}
                alt="logo"
                className='w-full object-cover blur-md  h-full scale-125 brightness-[0.4]    '
            />
            </div>
            {/* information */}
            <div className="flex z-10 w-3/4 h-full flex-col gap-3 p-8  ">
                <div>
                    <p>{organiser.name}</p>
                    <h2 className="text-2xl font-bold">Organise Event</h2>
                </div>
                <div>
                    <p className="flex  items-center gap-2">
                        <MapIcon size={16} />
                        {venue}
                    </p>
                </div>

                <div className="text-neutral-300">
                    <p>DATE : {date}</p>
                    <p>TIME : {time}</p>
                </div>
                <Divider />
                <div className="flex gap-4">
                    <p>General Seat</p>
                    <Divider orientation="vertical" />
                    <p>
                        Paid amount :
                        <span className="font-bold font-serif pl-3 text-yellow-300">
                            ₹
                        </span>
                        <span className="font-bold text-yellow-300">
                            {item.price}{' '}
                        </span>
                    </p>
                </div>
            </div>
            {/* bar code info */}
            <div className="flex w-1/4 border z-10 bg-white justify-center h-full text-black items-center   ">
                <div className="-rotate-90 scale-75 h-fit ">
                    <Barcode value={secureCode} />
                </div>
            </div>
        </div>
    )
}

export default Ticket
