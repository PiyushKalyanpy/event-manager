'use client'

import { useEffect, useState } from 'react'

import io from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function Home() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [switchState, setSwitchState] = useState('off') // Track switch state

    useEffect(() => {
        socket.on('response', (data) => {
            console.log('Received message:', data)
            setMessages((prev) => [...prev, data.value])
        })

        socket.on('switch_status', (data) => {
            console.log(`Client ${data.client_id} switched ${data.state}`)
            setSwitchState(data.state)
        })

        return () => {
            socket.off('response')
            socket.off('switch_status')
        }
    }, [])

    const sendMessage = () => {
        socket.send(input)
        setInput('')
    }

    const toggleSwitch = () => {
        const newState = switchState === 'on' ? 'off' : 'on'
        socket.emit('toggle_switch', { state: newState })
        setSwitchState(newState)
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Next.js with Flask-SocketIO</h1>
            <div style={{ marginTop: 20 }}>
                <h3>Switch is {switchState}</h3>
                <button onClick={toggleSwitch}>
                    Turn {switchState === 'on' ? 'Off' : 'On'}
                </button>
            </div>
            <div>
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}
