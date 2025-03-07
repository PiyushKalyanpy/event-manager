'use client'

import { useEffect, useState } from 'react'

import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'

const NotLive = ({ basicData }) => {
    const router = useRouter()
    const [countdown, setCountdown] = useState('')
    const liveAt = basicData.basic.liveAt

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const now = new Date()
            const distance = liveAt - now
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            )
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }, 1000)
        return () => clearInterval(countdownInterval)
    }, [liveAt])

    return (
        <div className="page-wrapper flex flex-col text-2xl  gap-8">
            <div className="flex flex-col items-center gap-2">
                Event will be Live In
                <div>{countdown}</div>
            </div>
            <Button
                onPress={() => {
                    router.back()
                }}
            >
                Go back
            </Button>
        </div>
    )
}

export default NotLive
