'use client'

import { useEffect, useState } from 'react'

import { Button } from '@heroui/react'
import NotLive from '@/components/live/NotLive'
import { useAuth } from '@/hooks/useAuth'
import { useLive } from '@/hooks/useLive'
import { useRouter } from 'next/navigation'

const LiveEvent = ({ params }) => {
    const eventId = params.eventId
    const {
        createLiveEvent,
        createPoll,
        addReaction,
        pollData,
        reactionsData,
        chatData,
        analyticsData,
        basicData,
        getChat,
        getPoll,
        getReactions,
        getBasic,
        liveData,
        getAnalytics,
        addVote,
        joinEvent,
        sendChatMessage,
        updateStatus,
    } = useLive()
    const { user } = useAuth()
    const router = useRouter()
    const [countdown, setCountdown] = useState('')

    // useEffect(() => {
    //     if (user) {
    //         joinEvent(eventId, user)
    //     }
    // }, [user])

    // get basics
    useEffect(() => {
        getBasic(eventId)
    }, [eventId])

    console.log(basicData)

    console.log('analyticsData', analyticsData)
    console.log('chatData', chatData)
    console.log('pollData', pollData)
    console.log('reactionsData', reactionsData)
    console.log('basicData', basicData)

    return (
        <div>
            {/* Event is offline */}
            {basicData &&
            basicData.basic &&
            basicData.basic.status === 'offline' ? (
                <div>
                    <NotLive basicData={basicData} />
                </div>
            ) : (
                <div>Live de</div>
            )}
        </div>
    )
}

export default LiveEvent
