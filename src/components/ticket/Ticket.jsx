'use client'

import { useEffect, useState } from 'react'

import { Divider } from '@nextui-org/react'
import Image from 'next/image'
import { MapIcon } from 'lucide-react'
import QRCode from 'react-qr-code'
import { useEvent } from '@/hooks/useEvent'

const Ticket = ({ item }) => {
    const [eventDetails, setEventDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { getEventById } = useEvent()

    if (error) {
        return <div>{error}</div>
    }

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

    const barcodeValue = status === 'Scanned' ? '00000000' : secureCode

    return (
        <div className="w-full relative flex flex-col sm:flex-row h-auto sm:h-64 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat">
            <div className="absolute w-full h-full z-0">
                <Image
                    src={imageURL}
                    width={900}
                    height={100}
                    alt="Event Image"
                    className={`w-full object-cover blur-md h-full scale-125 brightness-[0.4] ${status === 'Scanned' ? 'saturate-0' : ''}`}
                    priority
                />
            </div>

            <div className="flex z-10 w-full sm:w-3/4 h-full flex-col gap-3 p-6 sm:p-8">
                <div>
                    <h2 className="text-2xl font-bold">{eventName || ''}</h2>
                </div>
                <div>
                    <p className="flex items-center gap-2">
                        <MapIcon size={16} />
                        {venue || 'Venue Not Available'}
                    </p>
                </div>

                <div className="text-neutral-300">
                    <p>DATE : {date || 'Date Not Available'}</p>
                    <p>TIME : {time || 'Time Not Available'}</p>
                </div>
                <Divider />
                <div className="flex gap-4">
                    <p>{ticketType || 'Ticket Type Not Available'}</p>
                    <Divider orientation="vertical" />
                    <p>
                        Paid amount :
                        <span className="font-bold font-serif pl-3 text-yellow-300">
                            ₹
                        </span>
                        <span className="font-bold text-yellow-300">
                            {price || '0'}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex w-full sm:w-1/4 border z-10 bg-white justify-center h-auto sm:h-full text-black items-center p-4 sm:p-0">
                <div className="-rotate-90 scale-75 h-fit">
                    {status === 'Scanned' ? (
                        <QRCode value={'0'} size={200} />
                    ) : (
                        <QRCode value={barcodeValue} size={200} />
                    )}
                </div>
            </div>

            {status === 'Scanned' && (
                <div className="absolute top-24 w-full h-1/4 bg-white text-black z-20 flex flex-col justify-center items-center gap-2">
                    <p className="text-xl font-bold">Scanned Ticket</p>
                    <p className="text-xl font-bold">
                        {formatDateTime(convertTimestampToDate(scannedAt))}
                    </p>
                </div>
            )}
        </div>
    )
}

function convertTimestampToDate(timestamp) {
    if (!timestamp || !timestamp.seconds || !timestamp.nanoseconds) return null

    const { seconds, nanoseconds } = timestamp
    const date = new Date(seconds * 1000 + Math.floor(nanoseconds / 1e6))
    return date.toISOString()
}

function formatDateTime(timestamp) {
    if (!timestamp) return 'Date/Time Not Available'

    const date = new Date(timestamp)
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }
    return date.toLocaleDateString('en-GB', options).replace(',', ' ·')
}

export default Ticket
