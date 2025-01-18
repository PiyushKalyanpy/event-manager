'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import io from 'socket.io-client'

const SensorContext = createContext()

export const SensorProvider = ({ children }) => {
    useEffect(() => {
        const socket = io('http://localhost:5000')
        socket.on('connect', () => {
            console.log('Connected')
        })
        socket.on('sensor', (data) => {
            console.log(data)
        })

        socket.on('data', (data) => {
            console.log('sdfsdf')
            console.log(data)
        })

        socket.on('random_value', (data) => {
            console.log('Random value from server:', data.value)
            setRandomValue(data.value) // Update state with new random value
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const enableSensor = () => {
        const socket = io('http://localhost:5000')
        socket.emit('sensor_on')
    }

    const disableSensor = () => {
        const socket = io('http://localhost:5000')
        socket.emit('sensor_off')
    }

    return (
        <SensorContext.Provider value={{ sensorValue }}>
            {children}
        </SensorContext.Provider>
    )
}

export const useSensor = () => {
    return useContext(SensorContext)
}
