'use client'

import Barcode from 'react-barcode'
import { Divider } from '@heroui/react'
import Image from 'next/image'
import { MapIcon } from 'lucide-react'
import ShortUniqueId from 'short-unique-id'
import { unique } from 'next/dist/build/utils'
import { useEvent } from '@/hooks/useEvent'

const Ticket = ({ item }: any) => {
    console.log(item)
    const { getEventById }: any = useEvent()
    const { organiser, venue, date, time, imageURL } = getEventById(
        item.eventId
    )
    const {
        createdAt,
        eventId,
        eventName,
        scannedAt,
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
            <div className="absolute w-full h-full    z-0">
                <Image
                    src={imageURL}
                    width={900}
                    height={100}
                    alt="logo"
                    className={`w-full object-cover blur-md  h-full scale-125 brightness-[0.4] ${status == 'Scanned' && 'saturate-0'}`}
                />
            </div>
            {/* information */}
            <div className="flex z-10  w-3/4 h-full flex-col gap-3 p-8  ">
                <div>
                    <p>{organiser.name}</p>
                    <h2 className="text-2xl font-bold">
                        {eventName && eventName}
                    </h2>
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
                    {status == 'Scanned' ? (
                        <Barcode value={'00000000'} />
                    ) : (
                        <Barcode value={secureCode} />
                    )}
                </div>
            </div>
            {/* scanned info */}
            {status === 'Scanned' && (
                <div className="absolute top-24 w-full h-1/4 bg-white text-black z-20 flex flex-col justify-center items-center gap-2">
                    <p className="text-xl font-bold">Scanned Ticket</p>{' '}
                    <p className="text-xl font-bold">
                        {formatDateTime(convertTimestampToDate(scannedAt))}
                    </p>
                </div>
            )}
        </div>
    )
}
function convertTimestampToDate(timestamp: any) {
    const { seconds, nanoseconds } = timestamp

    const date = new Date(seconds * 1000 + Math.floor(nanoseconds / 1e6))

    return date.toISOString()
}

function formatDateTime(timestamp: any) {
    const date = new Date(timestamp)

    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }

    const formattedDate = date.toLocaleDateString('en-GB').replace(',', ' ·')
    return formattedDate
}

export default Ticket
