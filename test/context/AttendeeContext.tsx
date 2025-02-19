'use client'

import { createContext, useEffect, useState } from 'react'
import { onValue, push, ref } from 'firebase/database'

import { rdb } from '@/firebase'
import { useAuth } from '@/hooks/useAuth'

const AttendeeContext: any = createContext<undefined | any>(undefined)

export default function AttendeeContextProvider({ children }: any) {
    const [messages, setMessages]: any = useState([])
    const [poll, setPoll]: any = useState()
    const { user }: any = useAuth()

    const messagesRef = ref(rdb, 'messages')
    const pollRef = ref(rdb, 'poll')

    const sendMessage = async (message: any) => {
        try {
            await push(messagesRef, message)
        } catch (error) {
            console.log(error)
        }
    }

    const pollStart = async (poll: any) => {
        try {
            await push(pollRef, poll)
            setPoll(pollRef.key)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const messagesListener = onValue(messagesRef, (snapshot) => {
            setMessages(snapshot.val() || [])
        })
        const pollListener = onValue(pollRef, (snapshot) => {
            setPoll(snapshot.val()?.pollId)
        })
        return () => {
            messagesListener()
            pollListener()
        }
        // eslint-disable-next-line
        // cleanup for firebase listeners
    }, [])

    return (
        <AttendeeContext.Provider
            value={{ messages, poll, sendMessage, pollStart }}
        >
            {children}
        </AttendeeContext.Provider>
    )
}
