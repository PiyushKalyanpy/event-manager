import { createContext, useEffect, useState } from 'react'
import { db, rdb } from '@/firebase'
import {
    getDatabase,
    increment,
    onValue,
    push,
    ref,
    remove,
    runTransaction,
    set,
    update,
} from 'firebase/database'

export const LiveContext = createContext()

export default function LiveProvider({ children }) {
    const [liveData, setLiveData] = useState([])
    const [chatData, setChatData] = useState([])
    const [pollData, setPollData] = useState([])
    const [analyticsData, setAnalyticsData] = useState([])
    const [reactionsData, setReactionsData] = useState([])
    const [basicData, setBasicData] = useState([])

    const getAnalytics = async (eventId) => {
        const analyticsRef = ref(rdb, `/live/${eventId}/analytics`)
        onValue(analyticsRef, (snapshot) => {
            const data = snapshot.val()
            setAnalyticsData((prevData) => ({
                ...prevData,
                analytics: data,
            }))
        })
    }
 
     

    // get chat
    const getChat = async (eventId) => {
        const chatRef = ref(rdb, `/live/${eventId}/chats`)
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val()
            setChatData((prevData) => ({
                ...prevData,
                chats: data,
            }))
        })
    }

    // get poll
    const getPoll = async (eventId) => {
        const pollRef = ref(rdb, `/live/${eventId}/polls`)
        onValue(pollRef, (snapshot) => {
            const data = snapshot.val()
            setPollData((prevData) => ({
                ...prevData,
                polls: data,
            }))
        })
    }
    // get reactions
    const getReactions = async (eventId) => {
        const reactionsRef = ref(rdb, `/live/${eventId}/reactions`)
        onValue(reactionsRef, (snapshot) => {
            const data = snapshot.val()
            setReactionsData((prevData) => ({
                ...prevData,
                reactions: data,
            }))
        })
    }
    // get basic
    const getBasic = async (eventId) => {
        const basicRef = ref(rdb, `/live/${eventId}/basic`)
        onValue(basicRef, (snapshot) => {
            const data = snapshot.val()
            setBasicData((prevData) => ({
                ...prevData,
                basic: data,
            }))
        })
    }

    const createLiveEvent = async (eventId) => {
        const eventRef = ref(rdb, '/live/' + eventId)
        await set(eventRef, {
            eventId,
            basic: {
                status: 'offline',
                viewersCount: 0,
            },
            users: {},
            reactions: {},
            chats: {},
            polls: {},
            analytics: {
                totalViewers: 0,
                peakViewers: 0,
                engagementScore: 0,
            },
        })
    }

    // join event
    const joinEvent = async (eventId, user) => {
        const updates = {}
        console.log('user', user)
        updates[`/live/${eventId}/users/${user.uid}`] = {
            userId: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
            role: 'viewer',
            email: user.email,
            joinTime: Date.now(),
        }
        // updates[`/live/${eventId}/analytics/totalViewers`] = runTransaction(
        //     (current) => (current || 0) + 1
        // )
        updates[`/live/${eventId}/analytics/totalViewers`] = increment(1)
        console.log('updates', updates)
        await update(ref(rdb), updates)
    }

    const sendChatMessage = async (eventId, user, message) => {
        const chatRef = push(ref(rdb, `/live/${eventId}/chats`))

        const updates = {}
        updates[`/live/${eventId}/chats/${chatRef.key}`] = {
            user: {
                userId: user.uid,
                name: user.displayName,
                photoURL: user.photoURL,
            },
            message,
            timestamp: Date.now(), // Consider replacing with `serverTimestamp()`
            isPinned: false,
        }
        updates[`/live/${eventId}/analytics/engagementScore`] = increment(1)

        await update(ref(rdb), updates)
    }

    // create poll
    const createPoll = async (eventId, question, options) => {
        const pollRef = push(ref(rdb, `/live/${eventId}/polls`))
        const updates = {}
        console.log('pollRef', pollRef)
        updates[`/live/${eventId}/polls/${pollRef.key}`] = {
            question,
            options,
            timestamp: Date.now(), // Consider replacing with `serverTimestamp()`
        }
        await update(ref(rdb), updates)
    }

    // add reaction
    const addReaction = async (eventId, userId, reaction) => {
        const reactionRef = push(ref(db, `/live/${eventId}/reactions`))
        const engagementRef = ref(db, `/live/${eventId}/analytics`)
        const updates = {}
        updates[`/live/${eventId}/reactions/${reactionRef.key}`] = {
            userId,
            reaction,
            timestamp: Date.now(), // Consider replacing with `serverTimestamp()`
        }
        updates[`/live/${eventId}/analytics/engagementScore`] = runTransaction(
            (current) => (current || 0) + 1
        )
        await update(ref(db), updates)
    }

    // add vote
    const addVote = async (eventId, pollId, optionIndex) => {
        const pollRef = ref(db, `/live/${eventId}/polls/${pollId}`)
        const updates = {}
        updates[
            `/live/${eventId}/polls/${pollId}/options/${optionIndex}/votes`
        ] = runTransaction((current) => (current || 0) + 1)
        await update(ref(db), updates)
    }

    // update live
    const updateStatus = async (eventId, status) => {
        const liveRef = ref(db, `/live/${eventId}`)
        await update(liveRef, { status })
    }

    return (
        <LiveContext.Provider
            value={{
                createLiveEvent,
                joinEvent,
                sendChatMessage,
                createPoll,
                getAnalytics,
                liveData,
                getReactions,
                getBasic,
                getChat,
                getPoll,
                reactionsData,
                basicData,
                chatData,
                pollData,
                analyticsData,
                addReaction,
                addVote,
                updateStatus,
            }}
        >
            {children}
        </LiveContext.Provider>
    )
}
