'use client'

import React from 'react'
import io from 'socket.io-client'

const Test = () => {
    const [connectioStatus, setConnectioStatus] = React.useState('disconnected')
    const [message, setMessage] = React.useState('')
    const socket = io('http://localhost:5000')

    socket.on('connect', () => {
        setConnectioStatus('connected')
        console.log('connected')
    })
    socket.on('disconnect', () => {
        setConnectioStatus('disconnected')
        console.log('disconnected')
    })
    React.useEffect(() => {
        socket.on('message', (msg) => {
            setMessage(msg)
            console.log(msg)
        })
       
    }, [socket])

    return (
        <div className="full-page text-3xl">
            {/* client id */}
            Client ID: {socket.id}
            <br />
            Connection Status: {connectioStatus}
            <br />
            Message: {message}
            <br />
            <button
                onClick={() => {
                    socket.emit('message', 'Hello from client')
                }}
            >
                Send Message
            </button>
        </div>
    )
}

export default Test
