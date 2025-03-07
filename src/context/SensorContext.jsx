'use client'

import { createContext, useEffect, useState } from 'react'

import { color } from 'framer-motion'
import io from 'socket.io-client'

export const SensorContext = createContext()

let socket = io('http://localhost:5000')
const states = {
    connecting: {
        message: 'Trying to read sensors...',
        state: 'false',
        value: 'connecting',
    },
    connected: {
        message: 'Reading sensor',
        state: 'true',
        value: 'connected',
    },
    unconnected: {
        message: 'Not reading sensor',
        state: 'false',
        value: 'unconnected',
    },
    notFound: {
        message: 'Sensor not found',
        state: 'false',
        value: 'notFound',
    },
}

export const SensorProvider = ({ children }) => {
    const [switchState, setSwitchState] = useState('off')
    const [sensorData, setSensorData] = useState([])
    const [clientId, setClientId] = useState('')
    const [messages, setMessages] = useState([])
    const [currentState, setCurrentState] = useState(states.unconnected)
    const [rangeData, setRangeData] = useState({
        hum: {
            min: 0,
            max: 100,
            warningThreshold: 50,
            dangerThreshold: 60,
        },
        temp: {
            min: 0,
            max: 100,
            warningThreshold: 34,
            dangerThreshold: 60,
        },
        co: {
            min: 0,
            max: 800,
            warningThreshold: 80,
            dangerThreshold: 90,
        },
        formaldehyde: {
            min: 0,
            max: 100,
            warningThreshold: 40,
            dangerThreshold: 60,
        },
        lpg: {
            min: 0,
            max: 800,
            warningThreshold: 80,
            dangerThreshold: 90,
        },
    })

    const updateRangeData = (label, key, value) => {
        setRangeData((prevData) => ({
            ...prevData,
            [label]: {
                ...prevData[label],
                [key]: value,
            },
        }))
    }

    function normalize(value, min, max) {
         return Math.round(((value - min) / (max - min)) * 100);
    }

    useEffect(() => {
        if (sensorData.length > 3) {
            setCurrentState(states.connected)
        }
        // after length of 50, delete fist 25
        if (sensorData.length > 50) {
            setSensorData((prevData) => prevData.slice(25))
        }
    }, [sensorData])

    useEffect(() => {
        // on connecting to the server
        socket.on('connect', () => {
            console.log('Connected to server')
            setCurrentState(states.connecting)
            setClientId(socket.id)
        })

        // on disconnecting from the server
        socket.on('disconnect', () => {
            console.log('Disconnected from server')
            setCurrentState(states.unconnected)
        })

        // on receiving a message from the server
        socket.on('response', (data) => {
            const r = JSON.parse(data.value)
        
            const newData = {
                lpg: normalize(parseInt(r.MQ6.Analog, 10), rangeData.lpg.min, rangeData.lpg.max),
                formaldehyde: normalize(parseInt(r.MQ139.Analog, 10), rangeData.formaldehyde.min, rangeData.formaldehyde.max),
                co: normalize(parseInt(r.MQ9.Analog, 10), rangeData.co.min, rangeData.co.max),
                temp: normalize(parseInt(r.temp.Analog, 10), rangeData.temp.min, rangeData.temp.max),
                hum: normalize(parseInt(r.hum.Analog, 10), rangeData.hum.min, rangeData.hum.max),
                timestamp: new Date().toISOString(),
            };
            
            setSensorData((prevData) => [...prevData, newData])
         })

        //  on changing the sensor state
        socket.on('switch_status', (data) => {
            console.log(`switch status ${data.state}`)
            if (data.state === 'on') {
                setCurrentState(states.connected)
            } else {
                setCurrentState(states.unconnected)
            }
            setSwitchState(data.state)
        })

        return () => {
            socket.off('response')
            socket.off('switch_status')
        }
    }, [])
    const toggleSwitch = () => {
        console.log('Toggling switch')

        const newState = switchState === 'on' ? 'off' : 'on'
        socket.emit('toggle_switch', { state: newState })

        // Set the current state to 'connecting' before checking sensor data
        setCurrentState(states.connecting)

        // Wait for 5 seconds and check if sensor data is available and updating
    }

    const sendMessage = (message) => {
        socket.emit('message', message)
    }

    return (
        <SensorContext.Provider
            value={{
                switchState,
                toggleSwitch,
                sendMessage,
                sensorData,
                rangeData,
                updateRangeData,
                setRangeData,
                clientId,
                messages,
                setMessages,
                currentState,
                setCurrentState,
            }}
        >
            {children}
        </SensorContext.Provider>
    )
}
