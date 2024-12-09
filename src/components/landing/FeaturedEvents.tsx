'use client'

import { Button, Chip } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

const FeaturedEvents = (event: any) => {
    const { name, time, venue, imageURL, date } = event.event


    const targetDate = new Date(createDateObject(time, date)) // Set your event date and time here
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()

            if (difference <= 0) {
                clearInterval(timer)
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                })
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                )
                const minutes = Math.floor(
                    (difference % (1000 * 60 * 60)) / (1000 * 60)
                )
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds,
                })
            }
        }, 1000)
        return () => clearInterval(timer) // Cleanup the timer on unmount
    }, [targetDate])
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className=" w-3/4 bg-neutral-900  text-white  shadow-lg flex overflow-hidden  mx-auto">
                {/* Left Section */}
                <div className="p-6 flex flex-col gap-4  justify-between space-y-4 w-1/2">
                    <div className="gap-4 flex flex-col ">
                        <Chip variant="dot" color="success">
                            Featured Event
                        </Chip>
                        <h2 className="text-3xl font-semibold mt-2">{name}</h2>
                    </div>

                    <div>
                        <p className="uppercase text-sm tracking-wide">
                            Starts In...
                        </p>
                        <div className="text-3xl font-semibold flex space-x-4 mt-2">
                            <div>
                                <span>
                                    {timeLeft.days.toString().padStart(2, '0')}
                                </span>
                                <p className="text-xs mt-1">Days</p>
                            </div>
                            <div>
                                <span>
                                    {timeLeft.hours.toString().padStart(2, '0')}
                                </span>
                                <p className="text-xs mt-1">Hours</p>
                            </div>
                            <div>
                                <span>
                                    {timeLeft.minutes
                                        .toString()
                                        .padStart(2, '0')}
                                </span>
                                <p className="text-xs mt-1">Mins</p>
                            </div>
                            <div>
                                <span>
                                    {timeLeft.seconds
                                        .toString()
                                        .padStart(2, '0')}
                                </span>
                                <p className="text-xs mt-1">Sec</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm mt-4">
                        <p className="flex items-center space-x-2">
                            <span>📍</span>
                            <span>{venue}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span>⏰</span>
                            <span>{time}</span>
                        </p>
                    </div>
                    <Button color="primary" className="w-fit">
                        Get Ticket
                    </Button>
                </div>

                {/* Right Section */}
                <div className="w-1/2">
                    <div className="flex relative gap-4  h-full flex-col w-full">
                        <Image
                            src={imageURL}
                            alt="features"
                            width={1000}
                            height={1000}
                            className="w-full object-cover z-10 h-full "
                        />
                        <Image
                            src={imageURL}
                            alt="features"
                            width={10}
                            height={10}
                            className="w-full blur-2xl saturate-100 absolute top-0 left-0 opacity-90 object-cover h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedEvents

function createDateObject(time : any, date:any) {
  const [hours, minutes] = time.split(':');
  const [year, month, day] = date.split('-');

  // Create a Date object using the provided year, month, day, hours, and minutes
  return new Date(year, month - 1, day, hours, minutes);  // month is 0-indexed in JavaScript
}
